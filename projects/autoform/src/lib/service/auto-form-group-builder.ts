import { Injectable } from '@angular/core';
import {
    AbstractControl,
    FormArray,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import { AutoFormArray } from '../helper/form-group/auto-form-array';
import { AbstractFormGroup } from '../helper/form-group/abstract-form-group';
import { DictFormGroup } from '../helper/form-group/dict-form-group';
import {
    ArrayProperty,
    AutoFormData,
    DictionnayProperty,
    FormObject,
    IProperty,
    UnionProperty,
} from '../models';
import { FormAbstractObject } from '../models/properties/abstract-object';
import { ComponentRegisterService } from './component-register';

/**
 * AutoFormGroupBuilder
 *
 * the service to convert a AutoFormData to a AbstractControl
 *
 * I NEED TO BE REWORK AND ORGANIZE , IM A MESSY SHIT
 */
@Injectable()
export class AutoFormGroupBuilder {
    constructor(private componentRegister: ComponentRegisterService) {}

    getFormGroup(formData: AutoFormData): FormGroup {
        const controls = {};
        formData.items?.forEach((value) => {
          controls[value.name] = this.loopFormProperty(value);
        });
        return new FormGroup(controls);
    }
    loopFormProperty(value: IProperty): AbstractControl {
        if (value.type === 'object') {
            return this.getObjectForm(value as FormObject);
        } else if(value.type === 'abstractobject') {
            return new AbstractFormGroup(
              value as FormAbstractObject,
              (value) => this.loopFormProperty(value),
              (value as FormAbstractObject).properties.reduce((result, property) => {
                result[property.name] = this.loopFormProperty(property);
                return result;
              }, { [(value as FormAbstractObject).typeKey]: new FormControl((value as FormAbstractObject).abstractClassName)} as any),
            );
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
              type: new FormControl(undefined, (value.required) ? [Validators.required]: []),
              data: new FormGroup(tempForm),
            });
        } else if (value.type === 'array') {
            const v = value as ArrayProperty;
            const validators = [];
            const controls = [];
            /*if (v.required) {
                validators.push(Validators.required);
            }*/
            /*if (v.max) {
                validators.push(Validators.maxLength(v.max));
            }
            if (v.min) {
                validators.push(Validators.minLength(v.min));
            }
            */
            return new AutoFormArray(
              v, (value) => this.loopFormProperty(value), controls, validators
            );
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

    getObjectForm(obj: FormObject): FormGroup {
        let ret = {};
        obj.properties?.forEach((value) => {
            ret[value.name] = this.loopFormProperty(value);
        });
        return new FormGroup(ret);
    }
}
