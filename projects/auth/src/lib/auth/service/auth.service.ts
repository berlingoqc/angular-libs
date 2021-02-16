import { LoopbackRestClient } from '@berlingoqc/ngx-loopback';
import { ComponentType } from '@angular/cdk/portal';
import {
  HttpClient,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable, Optional } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { NgxPermissionsService } from 'ngx-permissions';
import { Observable, Subject, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  PasswordResetConfirmationRequest,
  PasswordResetRequest,
} from '../model/factor';
import { Credentials, NewUserRequest, User, UserProfile } from '../model/user';
import { SSOFullSettings } from '../../sso';
import {
  Organisation,
  getOrganisationOfType,
} from '../../organisation/model/organisation';
import { TokenService } from './token.service';
import { AuthSettingConfig } from '../model/auth-setting-config';
import { nointercept } from '../../unauthorized/service/http-interceptor';
import { envConfig } from '@berlingoqc/ngx-common';
import { env } from 'process';


export type LoginEvent = 'connected' | 'disconnected';

@Injectable()
export class AuthService {
  loginEvents = new Subject<LoginEvent>();

  profileUpdated = new Subject<UserProfile>();

  profile: UserProfile;

  loginObservable: Observable<any>;
  loginSub: Subscription;

  getDefaultOrg(type: string = ''): Organisation {
    return this.getOrg(type)[0] ?? {};
  }

  getOrg(type: string = ''): Organisation[] {
    return getOrganisationOfType(type, this.profile?.organisations ?? []);
  }

  constructor(
    public config: AuthSettingConfig,
    private tokenService: TokenService,
    private httpClient: HttpClient,
    public matDialog: MatDialog,
    public ngxPermissionService: NgxPermissionsService
  ) {
  }

  init() {
    const promiseToken = this.tokenService.loadFromStorage();
    if (promiseToken instanceof Promise) {
      this.loginObservable = new Observable((sub) => {
        console.log('Evn ', envConfig);
        this.me()
          .toPromise()
          .then((profile) => {
            this.ngxPermissionService.loadPermissions(profile.roles);
            this.profile = profile;
            this.loginEvents.next('connected');
            sub.next(true);
            sub.complete();
          });
      });
      this.loginSub = this.loginObservable.subscribe(() => {});
    }
  }

  get isLogin(): boolean {
    return this.tokenService.token && this.tokenService.token !== '';
  }

  /* SECTION API */
  createUser(user: NewUserRequest) {
    // valide si on n'est pas loger j'imagine
    return this.httpClient.post<User>(this.config.backend.url + '/users', user);
  }

  logout() {
    this.tokenService.token = '';
    this.tokenService.saveInStorage();
    this.profile = null;
    this.loginEvents.next('disconnected');
    this.ngxPermissionService.flushPermissions();
  }

  async login(cred: Credentials): Promise<void> {
    this.loginObservable = new Observable((sub) => {
      let promiseExpired: Promise<void>;
      this.loginRequest(cred)
        .then((x) => {
          promiseExpired = this.tokenService.setToken(x.token);
          this.me().subscribe((profile) => {
            this.profile = profile;
            this.ngxPermissionService.loadPermissions(this.profile.roles);
            this.loginEvents.next('connected');
            sub.next(true);
            sub.complete();
          });
        })
        .catch((e) => {
          sub.error(e);
        });
    });
    this.loginSub = this.loginObservable.subscribe(() => {});
    return await this.loginObservable.toPromise();
  }

  @nointercept(401)
  async loginRequest(cred: Credentials): Promise<{ token: string }> {
    const x = await this.httpClient
      .post<{ token: string }>(this.config.backend.url + '/users/login', cred)
      .toPromise();
    return x;
  }

  resetCredential(reset: PasswordResetRequest): Observable<void> {
    return this.httpClient.patch<void>(
      this.config.backend.url + '/users/credentials/reset',
      reset
    );
  }

  validCreateUser(email: string, otp: string): Observable<string> {
    return this.httpClient.get<string>(
      this.config.backend.url +
        `/users/credentials/validate?otp=${otp}&email=${email}`
    );
  }

  validOTPResetCredential(
    request: PasswordResetConfirmationRequest
  ): Observable<void> {
    return this.httpClient.patch<void>(
      this.config.backend.url + '/users/credentials/otp',
      request
    );
  }

  refreshSession(): Observable<void> {
    return this.httpClient
      .get<{ token: string }>(`${this.config.backend.url}/users/refresh`)
      .pipe(
        map((resp) => {
          this.tokenService.setToken(resp.token);
        })
      );
  }

  me(): Observable<UserProfile> {
    console.log(this.config)
    return this.httpClient.get<UserProfile>(
      this.config.backend.url + '/users/me'
    );
  }

  updateMe(user: UserProfile): Observable<UserProfile> {
    return this.httpClient.patch<UserProfile>(
      this.config.backend.url + '/users/me',
      user
    );
  }

  info(): Observable<SSOFullSettings> {
    return this.httpClient.get<SSOFullSettings>(
      this.config.backend.url + '/info/sso'
    );
  }
}
