import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Where, Count, Filter } from './loopback-model';

function isNumeric(num) {
    return !isNaN(num);
}

// convertie l'object en queryParams comme dans loopback
export function toQueryParams(name: string, object: any, unique = true) {
    const items = [];
    assembleQueryParams(items, '', object);
    return (unique ? '?' : '') + items.map((x) => `${name}${x}`).join('&');
}

function assembleQueryParams(
    items: string[],
    previouskeys: string,
    object: any,
): string[] {
    if (
        typeof object === 'boolean' ||
        typeof object === 'number' ||
        typeof object === 'string'
    ) {
        const value = `=${object}`;
        items.push(previouskeys + value);
    } else if (object instanceof Array) {
        throw new Error('TOP LEVEL ARRAY NOT NOT ');
    } else if (typeof object === 'object') {
        Object.entries(object).forEach(([k, v]) => {
            if (
                typeof v === 'boolean' ||
                typeof v === 'number' ||
                typeof v === 'string'
            ) {
                let value = `=${v}`;
                // si on nest pas dans un array
                if (!isNumeric(k)) {
                    value = `[${k}]` + value;
                }
                items.push(previouskeys + value);
            } else if (v instanceof Array) {
                if (v.length > 0) {
                    // previouskeys += `[${k}]`;
                    v.forEach((va, index) => {
                        items = assembleQueryParams(
                            items,
                            previouskeys + `[${k}]` + `[${index}]`,
                            va,
                        );
                    });
                }
            } else if (typeof v === 'object') {
                items = assembleQueryParams(items, previouskeys + `[${k}]`, v);
            }
        });
    }
    return items;
}

// Classe de base pour fournir les appels de base vers un controller CRUD de loopback2+
export abstract class LoopbackRestClient<T> implements CRUDDataSource<T> {
    countRoute = 'count';
    baseURL = '';

    get url(): string {
        return this.baseURL + this.route;
    }

    constructor(protected httpClient: HttpClient, protected route: string) {}

    protected getPath(...items: string[]): string {
        return `${this.url}/${items.join('/')}`;
    }

    protected getPathWithId(id: string, ...items: string[]) {
        return this.getPath(id, ...items);
    }

    count(where: Partial<T> = {}): Observable<Count> {
        return this.httpClient.get<Count>(
            this.getPath(this.countRoute) + toQueryParams('where', where),
        );
    }

    get(filter: Filter = {}): Observable<T[]> {
        return this.httpClient.get<T[]>(
            this.getPath() + toQueryParams('filter', filter),
        );
    }

    patch(id: string, d: Partial<T>): Observable<void> {
        return this.httpClient.patch<void>(this.getPathWithId(id), d);
    }

    post(body: T): Observable<T> {
        return this.httpClient.post<T>(this.getPath(), body);
    }

    getById(id: string, filter: Filter = {}): Observable<T> {
        return this.httpClient.get<T>(
            this.getPathWithId(id) + toQueryParams('filter', filter),
        );
    }

    updateById(id: string, data: Partial<T>): Observable<void> {
        return this.httpClient.patch<void>(this.getPathWithId(id), data);
    }

    delete(id: string, where?: Where): Observable<void> {
        return this.httpClient.delete<void>(
            this.getPathWithId(id) + toQueryParams('where', where),
        );
    }
}

export interface CRUDDataSource<T> {
    get: (filter?: Filter) => Observable<T[]>;

    patch?: (id: string, d: T) => Observable<void>;

    post?: (body: T) => Observable<T>;

    getById?: (id: string, filter?: Filter) => Observable<T>;

    updateById?: (id: string, data: Partial<T>) => Observable<void>;

    delete?: (id: string) => Observable<void>;
    count?: (where?: Where) => Observable<Count>;
}

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
