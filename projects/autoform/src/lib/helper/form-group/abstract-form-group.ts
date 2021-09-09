import { AbstractControl, FormGroup } from "@angular/forms";
import { IProperty } from "dist/autoform/public-api";
import { FormAbstractObject } from "projects/autoform/src/lib/models/properties/abstract-object";


export class AbstractFormGroup extends FormGroup {

  constructor(
    private abstractObjectProperty: FormAbstractObject,
    private resolvePropertyControl: (value: IProperty) => AbstractControl,
  ) {
    super({});
  }

  patchValue(value: {
        [key: string]: any;
    }, options?: {
        onlySelf?: boolean;
        emitEvent?: boolean;
    }): void {
      if (value) {
        // find type key
      }
      return super.patchValue(value, options);
    }
}
