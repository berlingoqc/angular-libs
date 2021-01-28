import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from '../service/token.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private tokenService: TokenService) { }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const authToken = this.tokenService.token;
    if (authToken && authToken !== '') {
      const authReq = req.clone({
        headers: req.headers.set('authorization', 'Bearer ' + authToken),
      });
      return next.handle(authReq);
    }
    return next.handle(req);
  }
}
