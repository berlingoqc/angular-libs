import { AbstractControl, AbstractControlOptions, AsyncValidatorFn, FormArray, ValidatorFn } from "@angular/forms";
import { ArrayProperty, IProperty } from "projects/autoform/src/lib/models";




export class AutoFormArray extends FormArray {
    staticSize: boolean;
    canAdd: boolean;
    canDelete: boolean;

    private getCanAdd(): boolean {
        if (this.array.max && this.array.max <= this.controls.length) {
            return false;
        }
        return true;
    }

    private getCanDelete(): boolean {
        if (this.array.min >= this.controls.length) return false;
        return true;
    }

    constructor(
        private array: ArrayProperty,
        private resolvePropertyControl: (value: IProperty) => AbstractControl,
        controls: AbstractControl[],
        validatorOrOpts?: ValidatorFn | ValidatorFn[] | AbstractControlOptions,
        asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[],
    ) {
        super(controls, validatorOrOpts, asyncValidator);
        this.staticSize = this.array.max && this.array.max === this.array.min;
        this.setState();
    }

    addControl() {
        const abstractControl = this.resolvePropertyControl(
            this.array.elementType,
        );
        this.controls.push(abstractControl);
        this.setState();
    }

    removeControl(index: number) {
        this.controls.splice(index, 1);
        this.setState();
    }

    setValue(
        value: any[],
        options?: { onlySelf?: boolean; emitEvent?: boolean },
    ): void {
        this.onControlValueChange(value);
        return super.patchValue(value, options);
    }

    reset(
        value: any[],
        options?: { onlySelf?: boolean; emitEvent?: boolean },
    ): void {
        this.onControlValueChange(value);
        return super.patchValue(value, options);
    }

    patchValue(
        value: any[],
        options?: { onlySelf?: boolean; emitEvent?: boolean },
    ): void {
        this.onControlValueChange(value, true);
        return super.patchValue(value, options);
    }

    private onControlValueChange(value?: any, patch?: boolean) {
        if (value) {
            for (let i = 0; i < value.length; i++) {
                if (!this.controls[i]) {
                    const control = this.resolvePropertyControl(
                        this.array.elementType,
                    );
                    // maybe optional
                    control.setValue(value[i]);
                    this.controls.push(control);
                }
            }
        }
        if (!patch && value.length < this.controls.length) {
          // delete this other element
        }
    }

    private setState() {
        this.canAdd = this.getCanAdd();
        this.canDelete = this.getCanDelete();
    }
}
