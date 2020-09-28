import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class LangInterceptor implements HttpInterceptor {

  constructor(private translateService: TranslateService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('adding current lang ', this.translateService.currentLang);

    const newReq = req.clone({
      params: req.params.append('lang', this.translateService.currentLang)
    });
    return next.handle(newReq);
  }
}
