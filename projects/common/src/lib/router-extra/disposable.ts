import { OnDestroy, Component } from '@angular/core';
import { Subscription } from 'rxjs';

// TODO: Add Angular decorator.
@Component({ template: '' })
export class DisposableComponent implements OnDestroy {
  subs: Subscription[] = [];

  ngOnDestroy() {
    this.subs.forEach((x) => x.unsubscribe());
  }

  addSub(sub: Subscription) {
    this.subs.push(sub);
  }
}
