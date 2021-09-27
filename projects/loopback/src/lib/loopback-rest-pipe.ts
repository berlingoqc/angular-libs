import { NgModule, Pipe, PipeTransform } from "@angular/core";
import { BaseRelationClient, LoopbackRelationAccessor } from "./loopback-rest";



@Pipe({name: 'lbRelation'})
export class AccessRelation implements PipeTransform {

  constructor() {}

  transform<T, K, TD extends BaseRelationClient<T>>(client: LoopbackRelationAccessor<K,T,TD>, fk: K) {
    return client(fk);
  }

}



@NgModule({imports: [], declarations: [AccessRelation], exports: [AccessRelation]})
export class LoopbackRestPipeModule {

}
