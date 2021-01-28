import { Injectable } from '@angular/core';
import {
  CanActivate,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService) { }

  canActivate(
  ): Observable<boolean> | boolean {
    if (this.authService.loginSub && !this.authService.loginSub.closed) {
      return this.authService.loginObservable;
    }

    return this.authService.isLogin;
  }
}
