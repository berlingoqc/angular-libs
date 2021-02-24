import { OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, of, Subscription } from 'rxjs';
import { finalize, shareReplay, switchMap } from 'rxjs/operators';



export type Constructor = new (...args: any[]) => {};

export function getSubscriptionFromProperty(instance: any): Subscription[] {
  const filterArray = Object.getOwnPropertyNames(instance)
    .map((property) => instance[property])
    .filter((value) => {
      return (
        value instanceof Subscription ||
        (Array.isArray(value) &&
          value.length > 0 && // Devrait trouvé une autre facon pour tester array or subscription
          value[0] instanceof Subscription)
      );
    });

  if (filterArray.length > 0) {
    const d = filterArray.reduce((p, c) => {
      if (!Array.isArray(p)) {
        p = [p];
      }
      if (!Array.isArray(c)) {
        c = [c];
      }
      p.push(...c);
      return p ? p : c;
    });
    // Si juste un élément reduce fait juste le retourner
    if (!Array.isArray(d)) {
      return [d];
    }
    return d;
  }
  return [];
}
/**
 * Décorateur pour @angular/component pour unsubscribe toutes les
 *
 * Peux-être utilisé comme décorateur de class ou comme Mixin
 */
export function unsubscriber<T extends Constructor>(constructor: T) {
  return class extends constructor implements OnDestroy {
    // Implémentre ngOnDestroy, si vous utilisé aussi ngOnDestroy
    // ne pas oublié de class super.ngOnDestroy()
    ngOnDestroy() {
      getSubscriptionFromProperty(this)
        .filter((sub) => !sub.closed)
        .forEach((sub) => {
          sub.unsubscribe();
        });
      // tslint:disable-next-line: no-string-literal
      if (super['ngOnDestroy']) {
        // tslint:disable-next-line: no-string-literal
        super['ngOnDestroy']();
      }
    }
  };
}
