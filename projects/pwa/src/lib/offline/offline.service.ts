import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class OfflineService {
  get isOnline() {
    return navigator.onLine;
  }

  event = new Subject<boolean>();

  constructor() {
    const handler = () => {
      this.event.next(this.isOnline);
    };
    window.addEventListener('online', handler);
    window.addEventListener('offline', handler);
  }
}
