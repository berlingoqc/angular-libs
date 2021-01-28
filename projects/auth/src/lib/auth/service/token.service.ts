import { Injectable } from '@angular/core';

import { JwtHelperService } from '@auth0/angular-jwt';
import { NotificationService } from '@berlingoqc/ngx-pwa';
import { NavigateService } from './navigate.service';
import { Subject } from 'rxjs';

@Injectable()
export class TokenService {
  // Temps avant l'expiration pour demander de renouveler
  static TimeoutBeforeExpired = 50000;
  static tokenStorageKey = 'sso-token';

  token: string;

  beforeExpiredTimeoutVar: any;
  onExpiredTimeoutVar: any;

  private helper = new JwtHelperService();

  beforeTokenExpired = new Subject<number>();
  tokenExpired = new Subject();
  tokenSet = new Subject();

  constructor() {}

  // setToken sauvegarde le token dans le localStorage et retourne un promise qui signale l'expiration du token et le temps en millisecond avant l'expiration
  setToken(t: string): Promise<void> {
    this.token = t;
    this.saveInStorage();

    const expirationDate = this.helper
      .getTokenExpirationDate(this.token)
      .getTime();
    const currentDate = Date.now();
    const timeDiff = expirationDate - currentDate;
    console.log(
      'TIME BEFORE EXPIRATION OF TOKEN',
      timeDiff,
      new Date(expirationDate).toTimeString()
    );
    const pro = new Promise<void>((resolver, reject) => {
      setTimeout(() => {
        resolver();
      }, timeDiff);
    }); // Set le timeout pour avis session va expirer
    if (this.beforeExpiredTimeoutVar) {
      clearTimeout(this.beforeExpiredTimeoutVar);
    }
    this.beforeExpiredTimeoutVar = setTimeout(
      () => this.beforeTokenExpired.next(),
      timeDiff - TokenService.TimeoutBeforeExpired
    );
    // Set event quand la session expire
    if (this.onExpiredTimeoutVar) {
      clearTimeout(this.onExpiredTimeoutVar);
    }
    this.onExpiredTimeoutVar = setTimeout(
      () => this.tokenExpired.next(),
      timeDiff
    );
    return pro;
  }

  // retourne Promise si le token est present et valide , retourne true si token est expired et false si pas de token
  loadFromStorage(): Promise<void> | boolean {
    const t = localStorage.getItem(TokenService.tokenStorageKey);
    if (t && t !== '') {
      const b = this.helper.isTokenExpired(t);
      console.log('IS TOKEN EXPIRED ?', b);
      if (!b) {
        return this.setToken(t);
      }
      return true;
    }
    return false;
  }

  saveInStorage() {
    localStorage.setItem(TokenService.tokenStorageKey, this.token);
    this.tokenSet.next(this.token);
  }
}
