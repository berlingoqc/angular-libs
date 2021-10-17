import { Observable, of } from "rxjs";
import { Count, Filter } from "../loopback-model";
import { CRUDDataSource } from "./datasource";

/**
 * Implementation of CRUDDataSource for static array
 * of data.
 */
export class StaticDataSource<T> implements CRUDDataSource<T> {
    constructor(public data: T[]) {}

    get(filter?: Filter): Observable<T[]> {
        let d = [...this.data];
        if (filter.order) {
            for (const order of filter.order) {
                const parts = order.split(' ');
                const trueRet = !parts[1] || parts[1] === 'asc' ? 1 : -1;
                const falseRet = parts[1] === 'desc' ? 1 : -1;
                d = d.sort((a, b) =>
                    a[filter.order[0]] > b[filter.order[0]]
                        ? trueRet
                        : falseRet,
                );
            }
        }
        return of(d);
    }

    count(): Observable<Count> {
        return of({ count: this.data.length });
    }
}
