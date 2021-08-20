import { AbstractControl, FormGroup } from "@angular/forms";
import { DictionnayProperty, IProperty } from "../../models";

export class DictFormGroup extends FormGroup {

  constructor(
    private dicProperty: DictionnayProperty,
    private resolvePropertyControl: (value: IProperty) => AbstractControl,
  ) {
    super({});
  }


  setValue(value: {
        [key: string]: any;
    }, options?: {
        onlySelf?: boolean;
        emitEvent?: boolean;
    }): void {
      return super.setValue(value, options);
    }

  patchValue(value: {
        [key: string]: any;
    }, options?: {
        onlySelf?: boolean;
        emitEvent?: boolean;
    }): void {
      if (value) {
        for(const item of Object.entries(value)) {
          if (!this.controls[item[0]]) {
            const iproperty = this.dicProperty.availableProperty.find(
              aProp => aProp.name === item[0]
            );
            if (iproperty) {
              this.addControl(item[0], this.resolvePropertyControl(iproperty));
            }
          }
        }
      }
      return super.patchValue(value, options);
    }




}
