import { Where, Count, Filter } from '../loopback-model';
import { CachingRequest, StateChange } from '@berlingoqc/ngx-common';
import { Constructor } from '@angular/cdk/table';
import { map } from 'rxjs/operators';
import { BaseRelationClient } from '../clients/loopback-relation';
import { CRUDDataSource } from '../clients/datasource';

export type CachingStoreHandlerFunc = (oldValue: any, change: any) => any;

/**
 * Handler configuration for the Caching Decorator
 *
 * custom function for every state change to handle to change of the data
 */
export interface CachingStoreHandler {
  delete?: CachingStoreHandlerFunc;
  update?: CachingStoreHandlerFunc;
  post?: CachingStoreHandlerFunc;
}


export interface CachingOptions {
  handlers?: { [id: string]: CachingStoreHandler };
}


const getCachingRequest = <T>(options: CachingOptions, operator: string) => {
  return new CachingRequest<T>({
          stateChange: (oldValue: T, change: StateChange<T>) => {
            switch(change.operation) {
              case 'delete':
                return (options?.handlers?.[operator]?.delete) ? options.handlers?.[operator]?.delete(oldValue, change): null;
              case 'update':
                return (options?.handlers?.[operator]?.update) ? options.handlers?.[operator]?.update(oldValue, change): null;
              default:
                return change.data;
            }
          }
        });
}

export function CachingRelation<D extends Constructor<BaseRelationClient<T, TD>>, T, TD>(type: D) {
  const requestGet = getCachingRequest<TD>({}, 'get');
  return class extends type {
      get = (filter?: Filter) => {
        return requestGet.getObs(filter, super.get(filter))
      }
  }
}

/**
 * Mixin to add Caching feature to your CRUDDataSource.
 * Using CachingRequest from @berlingoqc/ngx-common
 * @param type Constructor of a CRUDDataSource
 */
export function Caching<D extends Constructor<CRUDDataSource<T>>, T>(type: D, options?: CachingOptions) {
    return class extends type {
        requestGet = getCachingRequest<T[]>(options, 'get');
        requestFind = getCachingRequest<T>(options, 'find');
        requestCount = getCachingRequest<Count>(options, 'count');

        get = (filter?: Filter) => {
            return this.requestGet.getObs(filter, super.get(filter));
        };
        getById = super.getById
            ? (id: string, filter?: Filter) => {
                  return this.requestFind.getObs(
                      id,
                      super.getById(id, filter),
                  );
              }
            : undefined;

        patch = super.patch
            ? (id: string, d: T) => {
                  return this.requestFind.onModif(
                    super.patch(id, d).pipe(
                      map(() => ({
                        operation: 'update',
                        id,
                        data: d,
                      })
                    )
                  )).pipe(map(() => {}));
              }
            : undefined;
        post = super.post
            ? (body: T) => {
                  return super.post(body);
              }
            : undefined;
        updateById = (id: string, data: Partial<T>) => {
            return this.requestFind.onModif(
                super.updateById(id, data).pipe(map(() => ({
                operation: 'update',
                id,
                data
              })))).pipe(map(() => {}))
        };
        delete = super.delete
            ? (id: string) => {
                  return this.requestCount.onModif(
                    this.requestGet.onModif(
                      super.delete(id).pipe(
                        map(() => ({operation: 'delete', id}))
                      )
                    ) as any
                  ).pipe(
                    map(() => {})
                  );
              }
            : undefined;
        count = super.count
            ? (where: Where) => {
                  return this.requestCount.getObs(
                      where,
                      super.count(where),
                  );
              }
            : undefined;
    };
}
