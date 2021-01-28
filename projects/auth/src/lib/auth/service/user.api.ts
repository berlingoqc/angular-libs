import { Injectable } from '@angular/core';
import { LoopbackRestClient } from '@berlingoqc/ngx-loopback';
import { User } from '../model';
import { HttpClient } from '@angular/common/http';
import { AuthSettingConfig } from '../model/auth-setting-config';

@Injectable()
export class UserAPI extends LoopbackRestClient<User> {
  constructor(httpClient: HttpClient, config: AuthSettingConfig) {
    super(httpClient, '/users');
    this.baseURL = config.backend.url;
  }
}

