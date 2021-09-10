import { AbstractControl, AbstractControlOptions, AsyncValidatorFn, FormArray, ValidatorFn } from "@angular/forms";
import { IProperty } from "projects/autoform/src/lib/models";




export class AutoFormArray extends FormArray {

  constructor(
    private arrayType: IProperty,
    private resolvePropertyControl: (value: IProperty) => AbstractControl,
    controls: AbstractControl[], validatorOrOpts?: ValidatorFn | ValidatorFn[] | AbstractControlOptions,
    asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[]
  ) {
    super(controls, validatorOrOpts, asyncValidator);
  }


  setValue(
    value: any[],
    options?: {onlySelf?:boolean, emitEvent?: boolean}
  ): void {
    if (value) {
      for(let i = 0; i < value.length; i++) {
        if (!this.controls[i])  {
          const control = this.resolvePropertyControl(this.arrayType);
          // maybe optional
          control.setValue(value[i]);
          this.controls.push(control);
        }
      }
    }
    return super.patchValue(value, options);
  }

  reset(
    value: any[],
    options?: {onlySelf?:boolean, emitEvent?: boolean}
  ): void {
    if (value) {
      for(let i = 0; i < value.length; i++) {
        if (!this.controls[i])  {
          const control = this.resolvePropertyControl(this.arrayType);
          // maybe optional
          control.setValue(value[i]);
          this.controls.push(control);
        }
      }
    }
    return super.patchValue(value, options);
  }

  patchValue(
    value: any[],
    options?: {onlySelf?:boolean, emitEvent?: boolean}
  ): void {
    if (value) {
      for(let i = 0; i < value.length; i++) {
        if (!this.controls[i])  {
          const control = this.resolvePropertyControl(this.arrayType);
          // maybe optional
          control.setValue(value[i]);
          this.controls.push(control);
        }
      }
    }
    return super.patchValue(value, options);
  }
}
