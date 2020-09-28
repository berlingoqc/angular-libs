import { CVA } from './cva';
import { Input, Directive } from '@angular/core';
import { IProperty, ISubType } from '../models';

@Directive()
export class SubTypeComponent<
  T extends IProperty,
  S extends ISubType,
  Q
> extends CVA<Q> {
  _property: T;

  subtype: S;

  @Input()
  set property(p: T) {
    this._property = p;
    this.subtype = (this._property.subtype ? this._property.subtype : {}) as S;
  }
  get property(): T {
    return this._property;
  }
}
