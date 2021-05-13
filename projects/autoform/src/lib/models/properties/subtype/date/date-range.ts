import { AsyncValidatorFn, FormControl, FormGroup, ValidatorFn, Validators } from "@angular/forms";
import { DataResolver } from "@berlingoqc/ngx-common";
import { ISubType, SubTypeHandler } from "../../../subtype";

export interface DateRangeSubType extends ISubType {
  name: 'date-range';
    // moment ot start when using startView
  startAt?: DataResolver<Date>;
  // if you wanted a range date ; returne a RangedDate in the formcontrol
  range?: boolean;
}

export class DateRangeSubTypeHandler implements SubTypeHandler<DateRangeSubType> {

    getFormControl(formState: any,validators: ValidatorFn[], asyncValidators: AsyncValidatorFn[]) {
      return new FormGroup({
        start: new FormControl(null, [Validators.required]),
        end: new FormControl(null, [Validators.required]),
      });
    }


}
