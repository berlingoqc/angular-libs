import { Injectable, Inject } from '@angular/core';
import {
  Count,
  LoopbackRestClient,
  Filter,
  toQueryParams,
} from '@berlingoqc/ngx-loopback';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Organisation } from '../model';
import { AuthSettingConfig, User } from '../../auth';

@Injectable()
export class OrganisationAPI extends LoopbackRestClient<Organisation> {
  constructor(http: HttpClient, config: AuthSettingConfig) {
    super(http, '/organisations');
    this.baseURL = config.backend.url;
  }

  users(id: string, filter?: Filter<User>): Observable<User[]> {
    return this.httpClient.get<User[]>(
      `${this.url}/${id}/user` + toQueryParams('filter', filter)
    );
  }
  usersCount(id: string, where?: Partial<User>): Observable<Count> {
    return this.httpClient.get<Count>(
      `${this.url}/${id}/user/count` + toQueryParams('where', where)
    );
  }
}
