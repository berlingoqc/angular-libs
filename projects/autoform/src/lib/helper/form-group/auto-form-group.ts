import { AbstractControl, AbstractControlOptions, AsyncValidatorFn, UntypedFormGroup, ValidatorFn } from "@angular/forms";
import { Observable, of } from "rxjs";
import { FormObject } from "../../models";



export class AutoFormGroup extends UntypedFormGroup {

  constructor(
    public formObject: FormObject,
    controls: { [key: string]: AbstractControl},
    validatorOrOpts?: ValidatorFn | ValidatorFn[] | AbstractControlOptions,
    asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[],
  ) {
    super(controls, validatorOrOpts, asyncValidator);
  }

  getActionObservable(): Observable<void> {
    return of(null);
  }
}
