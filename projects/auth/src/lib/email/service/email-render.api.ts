import { LoopbackRestClient } from '@berlingoqc/ngx-loopback';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable, Inject } from '@angular/core';
import { RenderEmailRequest, RenderEmail, SendMailRequest, EmailTemplate } from '../model/email-template';
import { AUTH_BACKEND_URL } from '../../common';


@Injectable()
export class EmailTemplateAPI extends LoopbackRestClient<EmailTemplate> {

  constructor(http: HttpClient, @Inject(AUTH_BACKEND_URL) url: string) {
    super(http, '/email-templates');
    this.baseURL = url;
  }

  renderEmail(data: RenderEmailRequest): Observable<RenderEmail> {
    return this.httpClient.post<RenderEmail>(`${this.url}/render`, data);
  }

  sendRenderEmail(data: SendMailRequest): Observable<RenderEmail> {
    return this.httpClient.post<RenderEmail>(`${this.url}/sender`, data);
  }

}
