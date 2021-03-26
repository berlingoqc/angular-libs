import { Injectable } from '@angular/core';
import { LoopbackRestClient } from '@berlingoqc/ngx-loopback';
import { HttpClient } from '@angular/common/http';
import { User } from '../../auth/model/user';
import { Organisation } from '../model/organisation';
import { AuthSettingConfig } from '../../auth/model/auth-setting-config';
import { envConfig } from '@berlingoqc/ngx-common';

export interface OrgUserLink {
  id: number;
  organisationId: string;
  userId: string;
  user?: User;
  organisation?: Organisation;
}

@Injectable()
export class OrgUserLinkAPI extends LoopbackRestClient<OrgUserLink> {
  constructor(http: HttpClient, config: AuthSettingConfig) {
    super(http, '/users');
    this.baseURL = config.backend.url;
  }

  getPathWithId(id: string, ...items: string[]): string {
    return `${this.url}/${id}/org-user-links/${items.join('/')}`;
  }
}
