import { Observable } from "rxjs";
import { Count, Filter, Where } from "../loopback-model";


export interface CRUDDataSource<T, Wrapper = Array<T>> {
    get: (filter?: Filter) => Observable<Wrapper>;

    patch?: (id: string, d: T) => Observable<void>;

    post?: (body: T) => Observable<T>;

    getById?: (id: string, filter?: Filter) => Observable<T>;

    updateById?: (id: string, data: Partial<T>) => Observable<void>;

    delete?: (id: string) => Observable<void>;

    count?: (where?: Where) => Observable<Count>;
}
