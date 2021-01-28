import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { AuthService } from '../../auth';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private authService: AuthService) { }

  canActivate(route: ActivatedRouteSnapshot) {
    const roles = route.data.roles as string[];
    if (
      this.authService.profile &&
      roles.findIndex((r) => this.authService.profile.roles.indexOf(r) > -1) >
      -1
    ) {
      return true;
    }
    return false;
  }
}
