import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpErrorResponse,
  HttpEvent,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, take } from 'rxjs/operators';
import { Router } from '@angular/router';
import { UnauthorizedConfig } from '../model';

const errorInterceptorContext = {
  ignoreCodeStack: [],
};

function afterFunctionIntercept() {
  console.log('RESETING CODE');
  errorInterceptorContext.ignoreCodeStack.pop();
}

function beforeFunctionIntercept(code) {
  errorInterceptorContext.ignoreCodeStack.push(code);
}

function handleInterceptPromise(promise: Promise<any>) {
  promise.then(afterFunctionIntercept).catch(afterFunctionIntercept);
}

function handleInterceptObservalbe(obs: Observable<any>) {
  obs.pipe(take(1)).subscribe(afterFunctionIntercept, afterFunctionIntercept);
}

// @nointercept est une decorateur qu'on peux placer sur une fonction
// pour empêcher de rediriger vers la page d'erreur en cas d'erreur
// http et de laisser la fonction handler l'erreur
export function nointercept(errorCode?: number | number[]) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalCall = descriptor.value;
    descriptor.value = function (...args: any) {
      console.log('Appplying code');
      errorInterceptorContext.ignoreCodeStack.push(errorCode);
      const ret = originalCall.apply(this, args);
      if (ret instanceof Promise) {
        handleInterceptPromise(ret);
      } else if (ret instanceof Observable) {
        handleInterceptObservalbe(ret);
      } else {
        afterFunctionIntercept();
      }
      return ret;
    };
  };
}

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private router: Router, private config: UnauthorizedConfig) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (!errorInterceptorContext.ignoreCodeStack) {
          this.router.navigate([this.config.url, error.status]);
        } else {
          let codes =
            errorInterceptorContext.ignoreCodeStack[
              errorInterceptorContext.ignoreCodeStack.length - 1
            ] ?? [];
          if (typeof codes === 'number') {
            codes = [codes];
          }
          let ignore = false;
          for (let code of codes) {
            if (code === error.status) {
              ignore = true;
              break;
            }
          }
          if (!ignore) {
            this.router.navigate([this.config.url, error.status]);
          }
        }
        return throwError(error);
      })
    );
  }
}
