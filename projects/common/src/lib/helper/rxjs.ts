import { BehaviorSubject, Observable, of } from 'rxjs';
import { shareReplay, switchMap } from 'rxjs/operators';

export class CachingRequest<T> {
    subject: BehaviorSubject<void>;
    obs: Observable<T>;
    context: any;

    constructor() {
        this.subject = new BehaviorSubject(null);
    }

    getObs(context: any, chain: Observable<T>) {
        if (this.context !== context) {
            this.context = context;
            this.obs = this.subject.pipe(
                switchMap(() => chain),
                shareReplay(1),
            );
        }
        return this.obs;
    }

    onModif(obs: Observable<T>) {
        return obs.pipe(
            switchMap((x) => {
                this.subject.next();
                return of(x);
            }),
        );
    }
}
