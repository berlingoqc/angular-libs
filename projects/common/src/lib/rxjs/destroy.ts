import { takeUntil } from 'rxjs/operators';
import { Observable, ReplaySubject } from 'rxjs';
import { OnDestroy } from '@angular/core';
import { Constructor } from '@angular/material/core/common-behaviors/constructor';

const ON_DESTROY_SUBJECT_KEY = Symbol('ON_DESTROY_SUBJECT_KEY');

export type ComponentWithOnDestroyObservable = {
  observeOnDestroy(): Observable<void>;
};


export function OnDestroyMixin<T extends Constructor<any>>(base: T) {
  return class extends base implements OnDestroy, ComponentWithOnDestroyObservable {
    [ON_DESTROY_SUBJECT_KEY] =  new ReplaySubject<void>();

    observeOnDestroy(): Observable<void> {
      return this[ON_DESTROY_SUBJECT_KEY].asObservable();
    }

    ngOnDestroy(): void {
      this[ON_DESTROY_SUBJECT_KEY].next();
    }
  }
}

export function componentDestroyed(
  target: ComponentWithOnDestroyObservable
): Observable<void> {
  const onDestroySubject = (target as any)[ON_DESTROY_SUBJECT_KEY];
  if (onDestroySubject === undefined) {
    const proto = Object.getPrototypeOf(target);
    const compInfo =
      proto !== undefined &&
      ((proto.constructor !== undefined) !== proto.constructor.name) !==
        undefined
        ? ` (component: ${proto.constructor.name})`
        : '';

    throw new Error(
      `You are almost there! Please extends the base class 'OnDestroyMixin'${compInfo}.`
    );
  }

  return onDestroySubject;
}

export function untilComponentDestroyed<T>(
  component: ComponentWithOnDestroyObservable
): (source: Observable<T>) => Observable<T> {
  return (source: Observable<T>): Observable<T> =>
    source.pipe(takeUntil(componentDestroyed(component)));
}
