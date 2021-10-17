import { HttpClient } from "@angular/common/http";
import { Constructor } from "@angular/material/core/common-behaviors/constructor";
import { Observable } from "rxjs";
import { Count, Filter, Where } from "../loopback-model";
import { toQueryParams } from "../query-params";
import { CRUDDataSource } from "./datasource";

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
