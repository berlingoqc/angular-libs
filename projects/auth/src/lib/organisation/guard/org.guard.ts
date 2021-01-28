import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivateChild,
  CanLoad,
  Route,
} from '@angular/router';
import { Organisation, getOrganisationOfType } from '../model/organisation';
import { Role, AuthService } from '../../auth';

export interface OrgRessourceAccess {
  orgId?: string;
  type?: string;
  manager?: boolean;
  roles?: Role | Role[];
}

export function validateOrgRessourceAccess(
  data: OrgRessourceAccess,
  userId: string,
  organisations: Organisation[]
): boolean {
  const orgs = data.type
    ? getOrganisationOfType(data.type, organisations)
    : organisations;
  if (orgs && orgs.length > 0) {
    if (data.orgId) {
      const org = orgs.find((o) => o.id === data.orgId);
      if (org) {
        if (data.manager) {
          return org.managerId === userId;
        } else if (data.roles) {
          // TODO: Valide les roles dans l'organisation
          return false;
        }
        return true;
      }
      return false;
    } else {
      if (data.manager) {
        return orgs.findIndex((x) => x.managerId === userId) > -1;
      }
      return true;
    }
  }
  return false;
}

@Injectable()
export class OrgGuard implements CanActivate, CanActivateChild, CanLoad {
  data: OrgRessourceAccess;
  constructor(private authService: AuthService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.resolve(route);
  }

  canActivateChild(route: ActivatedRouteSnapshot) {
    return this.resolve(route);
  }

  canLoad(route: Route): boolean {
    return this.resolve(route);
  }

  private resolve(route) {
    this.data = route.data ?? {};
    if (this.authService.profile) {
      return validateOrgRessourceAccess(
        this.data,
        this.authService.profile.id,
        this.authService.profile.organisations
      );
    }
    return false;
  }
}
