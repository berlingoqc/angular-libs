import { AbstractControl, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { DictionnayProperty, IProperty } from '../../models';

export type IPropertyItem = IProperty & { disabledOption?: boolean };

export interface DictFieldInstance {
    control: AbstractControl;
    subChange?: Subscription;
    property?: string;
    prop?: IPropertyItem;
}
/**
 * FormGroup for the Dictionnary Object of AutoForm
 * it's purpose is to recreate the control
 * when the data is patch
 */
export class DictFormGroup extends UntypedFormGroup {
    properties: DictFieldInstance[] = [];
    mode: string;
    propertiesAvailable: IPropertyItem[] = [];

    allPropertyFill = false;

    constructor(
        private dicProperty: DictionnayProperty,
        private resolvePropertyControl: (value: IProperty) => AbstractControl,
    ) {
        super({});
        if (this.dicProperty.availableProperty) {
            this.mode = 'property';
            this.propertiesAvailable = this.dicProperty.availableProperty;
        } else if (this.dicProperty.availableType) {
            this.mode = 'type';
            this.propertiesAvailable = this.dicProperty.availableType;
        }
    }

    reset(
        value: {
            [key: string]: any;
        },
        options?: {
            onlySelf?: boolean;
            emitEvent?: boolean;
        },
    ): void {
        this.onControlValueModify(value);
        return super.setValue(value, options);
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
        this.onControlValueModify(value);
        return super.setValue(value, options);
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
        this.onControlValueModify(value, true);
        return super.patchValue(value, options);
    }

    private onControlValueModify(value?: any, keepIfNoValue = false) {
        // get the list of control present that are not
        // required and if they are not there they will be delete
        // except for patch value where unpresent data will be kept
        const values = Object.entries(value || {});
        this.propertiesAvailable
            .filter((prop) => prop.required)
            .forEach((prop) => {
                if (!values[prop.name]) values[prop.name];
            });

        const propertiesEdited: IProperty[] = [];
        for (const item of values) {
            const iproperty = this.dicProperty.availableProperty.find(
                (aProp) => aProp.name === item[0],
            );

            propertiesEdited.push(iproperty);

            if (iproperty) {
                if (!this.controls[item[0]]) {
                    this.addProperty(iproperty, true);
                }
            }
        }
        if (!keepIfNoValue) {
            // get the propertie that are not in the propertiesEdited
            const removedProperties = this.properties
                .map((prop, index) => [prop, index])
                .filter(
                    (v: any) =>
                        !v[0].prop ||
                        (!v[0].prop.required &&
                            !propertiesEdited.some(
                                (p) => p.name === v[0].prop.name,
                            )),
                );
            for (const item of removedProperties.reverse()) {
                this.removeProperty(item[1] as number);
            }
        }
    }

    addProperty(propertie?: any, recreate = false) {
        const item = {
            control: new UntypedFormGroup({
                property: new UntypedFormControl(),
                type: new UntypedFormControl(propertie),
            }),
            subChange: null,
            propertie: '',
            prop: propertie,
        };
        if (propertie?.required) {
            item.control.controls.type.disable({
                onlySelf: true,
                emitEvent: false,
            });
        }
        this.properties.push(item);
        let lastProperties = propertie;
        const handleValue = (value, recreate = true) => {
            item.propertie = value.name;
            if (lastProperties) {
                lastProperties.disabledOption = false;
                this.allPropertyFill = false;
            }

            for (const prop of this.propertiesAvailable) {
                if (prop.name === value.name) {
                    prop.disabledOption = true;
                    lastProperties = prop;
                    item.prop = lastProperties;
                    break;
                }
            }
            if (!this.propertiesAvailable.some((x) => !x.disabledOption)) {
                this.allPropertyFill = true;
            }
            if (recreate) {
                if (this.controls[value.name]) {
                    this.removeControl(value.name);
                }
                this.addControl(value.name, this.resolvePropertyControl(value));
            }
        };
        item.subChange = item.control.controls.type.valueChanges.subscribe(
            (value) => handleValue(value),
        );

        if (propertie) {
            handleValue(propertie, recreate);
        }
    }

    removeProperty(index: number) {
        const properties = this.properties.splice(index, 1)[0];
        if (properties.prop?.name) {
            this.removeControl(properties.prop?.name);
        }
        if (properties.prop) {
            properties.prop.disabledOption = false;
            this.allPropertyFill = false;
        }
        properties.subChange.unsubscribe();
    }
}
