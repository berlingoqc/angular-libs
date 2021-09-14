import { AbstractControl, FormGroup } from "@angular/forms";
import { IProperty } from "dist/autoform/public-api";
import { FormObject } from "../../models";

export class OptionalFormGroup extends FormGroup {

    constructor(
        private formObject: FormObject,
        private resolvePropertyControl: (value: IProperty) => AbstractControl,
        controls: { [id: string]: AbstractControl },
    ) {
        super(controls);
    }

    patchValue(data, options) {
      return super.setValue(data, options);
    }


    resetValue(data, options) {
      // if null remove all controls
      return super.setValue(data, options);
    }



    setValue(data, options) {
      return super.setValue(data, options);
    }

}
