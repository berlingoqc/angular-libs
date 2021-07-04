import { BehaviorSubject, Observable, of } from 'rxjs';
import { shareReplay, switchMap } from 'rxjs/operators';

import hash from 'object-hash';


export interface CachingItem<T> {
  hash: string;
  subject: BehaviorSubject<any>;
  obs: Observable<T>;
  context: any;
}

export class CachingRequest<T> {

    items: { [id: string]: CachingItem<T> };

    constructor() {
        this.items = {};
    }

    getObs(context: any, chain: Observable<T>) {
        const item = this.getCachingItem(context, chain);
        return item.obs;
    }

    onModif(obs: Observable<T>) {
        return obs.pipe(
            switchMap((x) => {
                // Reset all for now but maybe abaible to target item in the future,
                Object.values(this.items).forEach(item => item.subject.next(x));
                return of(x);
            }),
        );
    }

    private getCachingItem(context: any, chain: Observable<T>) {
      const contextHash = hash(context) as string;
      if (!this.items[contextHash]) {
            const subject = new BehaviorSubject(null);
            this.items[contextHash] = {
              hash: contextHash,
              context,
              subject,
              obs: subject.pipe(
                switchMap((value) => {
                  console.log('GOT VALUE ??', value);
                  return chain
                }),
                shareReplay(1)
              )
            };
      }
      return this.items[contextHash];
    }
}
