import { Injectable } from '@angular/core';
import {
    AbstractControl,
    FormArray,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import { DictFormGroup } from '../helper/form-group/dict-form-group';
import {
    ArrayProperty,
    AutoFormData,
    DictionnayProperty,
    FormObject,
    IProperty,
    UnionProperty,
} from '../models';
import { ComponentRegisterService } from './component-register';

/**
 * AutoFormGroupBuilder
 *
 * the service to convert a AutoFormData to a AbstractControl
 */
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
    loopFormProperty(value: IProperty): AbstractControl {
        if (value.type === 'object') {
          console.log('BUIDLING', value.name);
            return new FormGroup(this.getObjectForm(value as FormObject));
        } else if(value.type === 'union') {
          // TEMPORARY FIX UNTIL I FOUND SOMETHING BETTER FOR UNION
          /**
           * ONLY WORK IF PROPERTIES ARE FORMGROUP
           */
          const tempForm = {};
          Object.values((value as UnionProperty).types)
            .flatMap(item => (item as FormObject).properties)
            .forEach((item) => {
              tempForm[item.name] = this.loopFormProperty(item);
            });
            return new FormGroup({
              type: new FormControl(),
              data: new FormGroup(tempForm),
            });
        } else if (value.type === 'array') {
            const v = value as ArrayProperty;
            let validators = [];
            if (v.required) {
                validators.push(Validators.required);
            }
            return new FormArray([], validators);
        } else if (value.type === 'dic') {
          return new DictFormGroup((value as DictionnayProperty), (value) => this.loopFormProperty(value));
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
                        subType.name,
                    );
                    if (handler.getValidators) {
                        const ret = handler.getValidators(subType);
                        if (ret) {
                            if (ret[0]) {
                                validators.push(...ret[0]);
                            }
                            if (ret[1]) {
                                asyncValidators.push(...ret[1]);
                            }
                        }
                    }
                    if (handler.getFormControl) {
                      return handler.getFormControl({
                        value: (value as IProperty).value,
                        disabled: (value as IProperty).disabled,
                      },
                        validators,
                        asyncValidators
                      );
                    }
                } else {
                    // WARNING
                }
            }
            return new FormControl(
                {
                    value: (value as IProperty).value,
                    disabled: (value as IProperty).disabled,
                },
                validators,
                asyncValidators,
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
