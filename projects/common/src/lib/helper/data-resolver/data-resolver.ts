import { Observable, of } from 'rxjs';

/**
 *  DataResolver est un type pour les données qui nécessite
 *  d'être résolue
 */
export type DataResolver<T> = T | Observable<T> | (() => T | Observable<T>);

export function resolveData<T>(data: DataResolver<T>): Observable<T> {
  if (typeof data === 'function') {
    return (data as any)();
  } else if (data instanceof Observable) {
    return data;
  }
  return of(data as T);
}
