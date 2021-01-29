import { HttpClient } from '@angular/common/http';
import { APP_INITIALIZER, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { EnvironmentConfiguration } from './model';

export let envConfig: EnvironmentConfiguration;

@Injectable()
export class EnvConfigurationService {
  private readonly configUrl = 'assets/config/config.json';

  private configuration$: Observable<EnvironmentConfiguration>;

  constructor(private http: HttpClient) {}

  public load(): Observable<EnvironmentConfiguration> {
    if (!this.configuration$) {
      this.configuration$ = this.http
        .get<EnvironmentConfiguration>(this.configUrl)
        .pipe(
          map((x) => {
            envConfig = x;
            return x;
          })
        )
        .pipe(shareReplay(1));
    }
    return this.configuration$;
  }
}

export const APP_ENV_PROVIDER = {
  provide: APP_INITIALIZER,
  useFactory: (envConfigService: EnvConfigurationService) => () =>
    envConfigService.load().toPromise(),
  deps: [EnvConfigurationService],
  multi: true,
};
