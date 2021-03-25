import { HttpClient } from '@angular/common/http';
import { Type } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Where, Count, Filter, AnyObject, Include } from './loopback-model';

import { CachingRequest } from '@berlingoqc/ngx-common';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Constructor } from '@angular/cdk/table';
import { take } from 'rxjs/operators';

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

export class LoopbackRelationClient<T> implements CRUDDataSource<T> {

    get url(): string {
        return `${this.parent.baseURL}${this.parent.route}/${this.parentKey}/${this.name}`;
    }

    constructor(
        public parent: LoopbackRestClient<any>,
        public name: string,
        public parentKey: string,
    ) {}

    get = (filter?: Filter<any>) => {
        return this.parent.httpClient.get<T[]>(
            this.url + toQueryParams('filter', filter),
        );
    };

    post = (body: T) => {
        return this.parent.httpClient.post<T>(this.url, body);
    };

    getById = (id: string, filter?: Filter<any>) => {
        return this.parent.httpClient.get<T>(
            `${this.url}/${id}` + toQueryParams('filter', filter),
        );
    };

    updateById = (id: string, data: Partial<T>) => {
        return this.parent.httpClient.put<void>(`${this.url}/${id}`, data);
    };

    delete = (id: string) => {
        return this.parent.httpClient.delete<void>(`${this.url}/${id}`);
    };
}

export function LoopbackRelationClientMixin<T>(): Constructor<
    LoopbackRelationClient<T>
> {
    return class extends LoopbackRelationClient<T> {};
}

export type LoopbackRelationAccessor<K,T> = (key: K) => LoopbackRelationClient<T>;

export interface WithRelations {
  [id: string]: LoopbackRelationAccessor<any, any>;
}

export function addLoopbackRelation<K,P,T>(
  parent: LoopbackRestClient<P>,
  type: Constructor<LoopbackRelationClient<T>>,
  name: string,
): LoopbackRelationAccessor<K, T> {
  return (key) => new type(parent, name, key);
}


// Classe de base pour fournir les appels de base vers un controller CRUD de loopback2+
export abstract class LoopbackRestClient<T> implements CRUDDataSource<T> {
    countRoute = 'count';
    baseURL = '';

    get url(): string {
        return this.baseURL + this.route;
    }

    constructor(public httpClient: HttpClient, public route: string) {}

    public getPath(...items: string[]): string {
        return `${this.url}/${items.join('/')}`;
    }

    public getPathWithId(id: string, ...items: string[]) {
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

export function LoopbackRestClientMixin<T>(): Constructor<LoopbackRestClient<T>> {
  return class extends LoopbackRestClient<T> {}
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


/**
 * ResolveSourceRouteData data that can be pass
 * to a Resolving mixin to include in the request
 */
export interface ResolveSourceRouteData {
  include?: Include[];
}

/**
 * Mixin to implements the Resolve<T> interface for using with AngularRouting
 * call the getById function and extra data can be pass with the ResolveSourceRouteData
 * interface
 * @param type Constructor of a CRUDDataSource
 */
export function Resolving<D extends Constructor<CRUDDataSource<T>>, T>(type: D) {
    return class extends type implements Resolve<T> {
      resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params.id;
        const data = route.data as ResolveSourceRouteData;
        return this.getById(id, data).pipe(take(1));
      }
    }
}

/**
 * Mixin to add Caching feature to your CRUDDataSource.
 * Using CachingRequest from @berlingoqc/ngx-common
 * @param type Constructor of a CRUDDataSource
 */
export function Caching<D extends Constructor<CRUDDataSource<T>>, T>(type: D) {
    return class extends type {
        requestGet = new CachingRequest();
        requestFind = new CachingRequest();
        requestCount = new CachingRequest();

        get = (filter?: Filter) => {
            return this.requestGet.getObs(filter, super.get(filter)) as any;
        };
        getById = super.getById
            ? (id: string, filter?: Filter) => {
                  return this.requestFind.getObs(
                      id,
                      super.getById(id, filter),
                  ) as any;
              }
            : undefined;

        patch = super.patch
            ? (id: string, d: T) => {
                  return super.patch(id, d);
              }
            : undefined;
        post = super.post
            ? (body: T) => {
                  return super.post(body);
              }
            : undefined;
        updateById = (id: string, data: Partial<T>) => {
            return this.requestFind.onModif(super.updateById(id, data)) as Observable<void>;
        };
        delete = super.delete
            ? (id: string) => {
                  return super.delete(id);
              }
            : undefined;
        count = super.count
            ? (where: Where) => {
                  return this.requestCount.getObs(
                      where,
                      super.count(where),
                  ) as any;
              }
            : undefined;
    };
}

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
