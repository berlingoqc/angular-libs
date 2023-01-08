import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, shareReplay, switchMap } from 'rxjs/operators';

import hash from 'object-hash';


export interface CachingItem<T> {
  hash: string;
  subject: BehaviorSubject<any>;
  obs: Observable<T>;
  context: any;
}


export interface StateChange<T> {
  operation: string;
  id?: any;
  data?: T;
}

export interface CachingRequestOptions<T> {
  stateChange?: (oldValue: T, change: StateChange<T>) => T
}

export class CachingRequest<T> {

    items: { [id: string]: CachingItem<T> };

    constructor(
      public options: CachingRequestOptions<T> = {}
    ) {
        this.items = {};
    }

    defaultValueObs(context: any, value: any) {
      if (!context) {
        context = {};
      }
      const contextHash = hash(context) as string;

      let item = this.items[contextHash];
      if (!item) {
         throw "failed to get item"
      }

      item.subject.next(value);
    }

    getObs(context: any, chain: Observable<T>, defaultValue = undefined) {
        const item = this.getCachingItem(context, chain, defaultValue);
        return item.obs;
    }

    onModif(obs: Observable<StateChange<any>>): Observable<StateChange<any>> {
        return obs.pipe(
            map((x) => {
                // Reset all for now but maybe abaible to target item in the future,
                Object.values(this.items).forEach(item => item.subject.next(x));
                return x;
            }),
        );
    }

    private getCachingItem(context: any, chain: Observable<T>, defaultValue = undefined) {
      if (!context) {
        context = {};
      }
      const contextHash = hash(context) as string;
      if (!this.items[contextHash]) {
            const subject = new BehaviorSubject(defaultValue);
            let lastValue: T = defaultValue
            this.items[contextHash] = {
              hash: contextHash,
              context,
              subject,
              obs: subject.pipe(
                switchMap((value) => {
                  if (lastValue && value && this.options.stateChange) {
                    const v = this.options.stateChange(lastValue, value);
                    if (v) {
                      return of(v);
                    }
                  }
                  return chain
                }),
                map((itemValue) => {
                  lastValue = itemValue;
                  return itemValue;
                }),
                shareReplay(1)
              )
            };
      }
      return this.items[contextHash];
    }
}
