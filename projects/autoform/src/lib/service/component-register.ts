/**
 * For every type there is a handler register with the appropriate
 * subtype available with is implementation that can be instanciate
 */

import { Input, Injectable, Directive, ViewChild } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { IPropertyComponentHandler, SubTypeHandler } from '../models';
import { IProperty, IPropertyType } from '../models/properties/iproperty';


/**
 * BaseFieldComponent, base class for all of property component.
 *
 * there is no logic but it contains the @Input that are shared
 * by all property component.
 */
@Directive()
export abstract class BaseFieldComponent<
  T extends IProperty,
  C extends AbstractControl
> {
  private innerData: T;

  @ViewChild('myInput') input: any;

  @Input()
  set data(t: T) {
    this.innerData = t;
    if (this.data?.subtype?.name) {
      const handler = this.componentRegister.getSubTypeHandler(
        this.data.subtype.name
      );
      if (handler.getErrors) {
        const errors = handler.getErrors(this.data.subtype);
        Object.entries(errors).forEach(([k, v]) => {
          if (!this.data.errors[k]) {
            this.data.errors[k] = v;
          }
        });
      }
    }
  }
  get data(): T {
    return this.innerData;
  }

  @Input() abstractControl: C;

  constructor(protected componentRegister: ComponentRegisterService) {}

  ngOnInit() {
    this.data.errors;
  }
}


/**
 * ComponentRegisterService
 *
 * This service is a root service that contains the mapping
 * for the component property and the available subtype and subcomponent.
 */
@Injectable({
  providedIn: 'root',
})
export class ComponentRegisterService {
  registerPropertyHandler: IPropertyComponentHandler[] = [];
  subTypeHandlers: { [id: string]: SubTypeHandler<any> } = {};

  registerSubTypeHandler(
    name: string,
    subTypeHande: SubTypeHandler<any>
  ): void {
    this.subTypeHandlers[name] = subTypeHande;
  }

  getSubTypeHandler(name: string): SubTypeHandler<any> {
    const d = this.subTypeHandlers[name];
    if (!d) {
      throw `Subtype not found ${name}`;
    }
    return d;
  }

  registerComponent(pch: IPropertyComponentHandler) {
    this.registerPropertyHandler.push(pch);
  }

  getRegisterComponent(name: IPropertyType): IPropertyComponentHandler {
    const item = this.registerPropertyHandler.find((y) => y.type === name);
    if (!item) {
      throw 'No register component for type ' + name;
    }
    return item;
  }
}
