import { Injectable } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  ArrayProperty,
  AutoFormData,
  FormObject,
  FormProperty,
  IProperty,
} from '../models';
import { ComponentRegisterService } from './component-register';

@Injectable()
export class AutoFormGroupBuilder {
  constructor(private componentRegister: ComponentRegisterService) {}

  getFormGroup(formData: AutoFormData): FormGroup {
    const controls = {};
    formData.items.forEach((value) => {
      controls[value.name] = new FormGroup(this.getObjectForm(value));
    });
    return new FormGroup(controls);
  }
  loopFormProperty(value: FormProperty): AbstractControl {
    if (value.type === 'object') {
      return new FormGroup(this.getObjectForm(value as FormObject));
    } else if (value.type === 'array') {
      const v = value as ArrayProperty;
      let validators = [];
      if (v.required) {
        validators.push(Validators.required);
      }
      return new FormArray([], validators);
    } else {
      const validators = [];
      const asyncValidators = [];
      if ((value as IProperty).required) {
        validators.push(Validators.required);
      }
      const subType = (value as IProperty)?.subtype;
      if (subType) {
        if (subType.name) {
          const handler = this.componentRegister.getSubTypeHandler(
            subType.name
          );
          const ret = handler.getValidators(subType);
          if (ret) {
            if (ret[0]) {
              validators.push(...ret[0]);
            }
            if (ret[1]) {
              asyncValidators.push(...ret[1]);
            }
          }
        } else {
          // WARNING
        }
      }
      return new FormControl(
        {
          value: '',
          disabled: false, // DOIT PARAMETRER
        },
        validators,
        asyncValidators
      );
    }
  }

  getObjectForm(obj: FormObject): any {
    let ret = {};
    obj.properties.forEach((value) => {
      ret[value.name] = this.loopFormProperty(value);
    });
    return ret;
  }
}
