import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable()
export class IDResolver {
  resolveID(): Observable<string> {
    return of(Date.now().toString());
  }
}

@Injectable()
export class PathIDResolver implements IDResolver {
  constructor(private router: Router) {}

  resolveID() {
    return of(this.router.url);
  }
}
