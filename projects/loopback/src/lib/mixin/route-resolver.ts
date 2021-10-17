import { Constructor } from "@angular/cdk/table";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { take } from "rxjs/operators";
import { Include } from "../loopback-model";
import { CRUDDataSource } from "../clients/datasource";

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
