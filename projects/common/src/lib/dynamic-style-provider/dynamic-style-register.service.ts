import { Injectable } from '@angular/core';



@Injectable()
export class DynamicStyleRegisterService {
  items: {[id: string]: {
    classList: string[];
  }} = {};


  getItem(id: string) {
    return this.items[id] ?? { classList: []};
  }

}
