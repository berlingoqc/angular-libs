import { takeUntil } from 'rxjs/operators';
import { Observable, ReplaySubject } from 'rxjs';
import { OnDestroy } from '@angular/core';
import { Constructor } from '@angular/cdk/table';

export type ComponentWithOnDestroyObservable = {
  observeOnDestroy(): Observable<void>;
  destroySubject: ReplaySubject<void>;
};


export function OnDestroyMixin<T extends Constructor<any>>(base: T) {
  return class extends base implements OnDestroy, ComponentWithOnDestroyObservable {
    public destroySubject =  new ReplaySubject<void>();

    observeOnDestroy(): Observable<void> {
      return this.destroySubject.asObservable();
    }

    ngOnDestroy(): void {
      this.destroySubject.next();
    }
  }
}

export function componentDestroyed(
  target: ComponentWithOnDestroyObservable
): Observable<void> {
  const onDestroySubject = target.destroySubject;
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
