import { AbstractControl, FormGroup } from "@angular/forms";
import { FormAbstractObject } from "projects/autoform/src/lib/models/properties/abstract-object";
import { FormObject, IProperty } from "../../models";


export class AbstractFormGroup extends FormGroup {

  selectedSubType: FormObject;

  properties: IProperty[] = [];


  constructor(
    private abstractObjectProperty: FormAbstractObject,
    private resolvePropertyControl: (value: IProperty) => AbstractControl,
    controls: { [id: string]: AbstractControl },
  ) {
    super(controls);
    this.properties = [...this.abstractObjectProperty.properties];
  }


  selectChildType(type: string): void {
      if (this.selectedSubType) {
        this.selectedSubType.properties.forEach((prop) => this.removeControl(prop.name));
      }
      const child = this.abstractObjectProperty.childs.find((child) => child.name === type);
      // also need to delete all property that are no longer there
      for(const property of child.properties) {
        this.addControl(property.name, this.resolvePropertyControl(property));
      }
      this.selectedSubType = child;
      this.properties = [...this.abstractObjectProperty.properties, ... this.selectedSubType.properties];
  }

  patchValue(value: {
        [key: string]: any;
    }, options?: {
        onlySelf?: boolean;
        emitEvent?: boolean;
    }): void {
      if (value) {
        // find type key
        const type = value[this.abstractObjectProperty.typeKey || 'type'];
        if (type) this.selectChildType(type);
      }
      return super.patchValue(value, options);
    }
}
