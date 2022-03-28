import { Constructor } from "@angular/material/core/common-behaviors/constructor";
import { Observable } from "rxjs";
import { AnyObject, Count, Filter, Where } from "../loopback-model";
import { toQueryParams } from "../query-params";
import { CRUDDataSource } from "./datasource";
import { LoopbackRestClient } from "./loopback-api";


export interface RelationCustomPath {
  delete?: string
}

export interface LoopbackRelationConfig {
  extraPath?: string,
  customPath?: RelationCustomPath,
}

export abstract class BaseRelationClient<T, TD = T> {
    get url(): string {
        return `${this.parent.url}/${this.parentKey}/${this.name}${this.config.extraPath ? this.config.extraPath: ''}`;
    }

    constructor(
        public parent: LoopbackRestClient<any>,
        public name: string,
        public parentKey: string,
        public config?: LoopbackRelationConfig,
    ) {}


    abstract get(filter?: Filter): Observable<TD>;
}


export class LoopbackHaveOneRelationClient<T> extends BaseRelationClient<T> {
  get(filter?: Filter) {
    return this.parent.httpClient.get<T>(
      this.url + toQueryParams('filter', filter)
    )
  }

  updateById(id: any, data: T) {
    return this.parent.httpClient.put<T>(
      `${this.url}/${id}`,
      data
    );
  }
}

export class LoopbackRelationClient<T> extends BaseRelationClient<T, Array<T>> implements CRUDDataSource<T> {

    get(filter?: Filter<any>) {
        return this.parent.httpClient.get<T[]>(
            this.url + toQueryParams('filter', filter),
        );
    };

    count(where: Where<AnyObject> = {}): Observable<Count> {
      return this.parent.httpClient.get<Count>(
          `${this.url}/count` + toQueryParams('where', where),
      )
    }

    post(body: T) {
        return this.parent.httpClient.post<T>(this.url, body);
    };

    getById(id: string, filter?: Filter<any>) {
        return this.parent.httpClient.get<T>(
            `${this.url}/${id}` + toQueryParams('filter', filter),
        );
    };

    updateById(id: string, data: Partial<T>) {
        return this.parent.httpClient.put<void>(`${this.url}/${id}`, data);
    };

    delete(id: string) {
        return this.parent.httpClient.delete<void>(`${this.url}/${id}${this.config?.customPath?.delete || ''}`);
    };
}

export function LoopbackRelationClientMixin<T>(): Constructor<
    LoopbackRelationClient<T>
> {
    return class extends LoopbackRelationClient<T> {};
}

export function LoopbackHasOneRelationClientMixin<T>(): Constructor<
  LoopbackHaveOneRelationClient<T>
> {
  return class extends LoopbackHaveOneRelationClient<T> {};
}

export type LoopbackRelationAccessor<K,T, RC extends BaseRelationClient<T>> = (key: K) => RC;

export interface WithRelations {
  [id: string]: LoopbackRelationAccessor<any, any, BaseRelationClient<any>>;
}

export function addLoopbackRelation<K,P,T, RC extends BaseRelationClient<T>>(
  parent: LoopbackRestClient<P>,
  type: Constructor<RC>,
  name: string,
  config?: LoopbackRelationConfig,
): LoopbackRelationAccessor<K, T, RC> {
  let clientMap: {[id: string]: RC} = {};
  return (key) => {
    const id = `${name}:${key}`;
    if (!clientMap[id]) {
      clientMap[id] = new type(parent, name, key, config);
    }
    return clientMap[id];
  };
}
