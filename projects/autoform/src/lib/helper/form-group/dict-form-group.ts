import { AbstractControl, FormGroup } from "@angular/forms";
import { DictionnayProperty, FormProperty} from "../../models";

export class DictFormGroup extends FormGroup {

  constructor(
    private dicProperty: DictionnayProperty,
    private resolvePropertyControl: (value: FormProperty) => AbstractControl,
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
      for(const item of Object.entries(value)) {
        if (!this.controls[item[0]]) {
          this.addControl(item[0], this.resolvePropertyControl(
            this.dicProperty.availableProperty.find(aProp => aProp.name === item[0])));
        }
      }
      return super.patchValue(value, options);
    }




}
