import { AbstractControl, FormGroup } from '@angular/forms';
import { FormAbstractObject } from 'projects/autoform/src/lib/models/properties/abstract-object';
import { FormObject, IProperty } from '../../models';


function selectChildType(
  type: string, selectedSubType: FormObject, abstractObjectProperty: FormAbstractObject,
  control: FormGroup,resolvePropertyControl: (value: IProperty) => AbstractControl
): [FormObject, IProperty[], string] {
        if (selectedSubType) {
            selectedSubType.properties.forEach((prop) =>
                control.removeControl(prop.name),
            );
        }

        if (!type || type === abstractObjectProperty.abstractClassName) {
            return [
              undefined,
              [...abstractObjectProperty.properties],
              abstractObjectProperty.abstractClassName
            ];
        } else {
            const child = abstractObjectProperty.childs.find(
                (child) => child.name === type,
            );
            // also need to delete all property that are no longer there
            for (const property of child.properties) {
                control.addControl(
                    property.name,
                    resolvePropertyControl(property),
                );
            }
            return [child,
            [
                ...abstractObjectProperty.properties,
                ...child.properties,
            ], child.name];
        }
    }

export class AbstractFormGroup extends FormGroup {
    selectedSubType: FormObject;

    properties: IProperty[] = [];


    selectChildType = (type) => {
      const [child, properties, typeSelected] = selectChildType(
      type,
      this.selectedSubType,
      this.abstractObjectProperty,
      this,
      this.resolvePropertyControl,
    );
    this.selectedSubType = child;
    this.properties = properties;
    return typeSelected;
    }

    onControlValueModify(value?: any) {
      const keyType = this.abstractObjectProperty.typeKey || 'type';
      if (!value) {
        value = {};
      }
      value[keyType] =  this.selectChildType(value[keyType]);
      return value;
    }

    constructor(
        private abstractObjectProperty: FormAbstractObject,
        private resolvePropertyControl: (value: IProperty) => AbstractControl,
        controls: { [id: string]: AbstractControl },
    ) {
        super(controls);
        this.properties = [...this.abstractObjectProperty.properties];
    }

    reset(
        value?: any,
        options?: {
            onlySelf?: boolean;
            emitEvent;
        },
    ) {
      value = this.onControlValueModify(value);
      return super.reset(value, options);
    }

    setValue(
        value: {
            [key: string]: any;
        },
        options?: {
            onlySelf?: boolean;
            emitEvent?: boolean;
        },
    ): void {
        value = this.onControlValueModify(value);
        return super.patchValue(value, options);
    }

    patchValue(
        value: {
            [key: string]: any;
        },
        options?: {
            onlySelf?: boolean;
            emitEvent?: boolean;
        },
    ): void {
        value = this.onControlValueModify(value);
        return super.patchValue(value, options);
    }
}
