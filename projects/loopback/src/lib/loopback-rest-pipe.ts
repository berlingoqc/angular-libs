import { NgModule, Pipe, PipeTransform } from "@angular/core";
import { LoopbackRelationAccessor } from "./loopback-rest";



@Pipe({name: 'lbRelation'})
export class AccessRelation implements PipeTransform {

  constructor() {}

  transform<T, K>(client: LoopbackRelationAccessor<K,T>, fk: K) {
    return client(fk);
  }

}



@NgModule({imports: [], declarations: [AccessRelation], exports: [AccessRelation]})
export class LoopbackRestPipeModule {

}
