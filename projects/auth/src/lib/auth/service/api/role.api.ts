import { Injectable } from '@angular/core';
import { LoopbackRestClient } from '@berlingoqc/ngx-loopback';
import { Role } from '../../model';
import { HttpClient } from '@angular/common/http';
import { AuthSettingConfig } from '../../model/auth-setting-config';

@Injectable()
export class RoleAPI extends LoopbackRestClient<Role> {
  constructor(http: HttpClient, config: AuthSettingConfig) {
    super(http, '/roles');
    this.baseURL = config.backend.url;
  }
}


