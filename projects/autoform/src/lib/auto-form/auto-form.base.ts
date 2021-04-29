import { Directive, Inject, InjectionToken, Input, Optional, Type } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AutoFormData } from '../models';
import { AutoFormGroupBuilder } from '../service/auto-form-group-builder';

export const AUTO_FORM_DATA = new InjectionToken<AutoFormData>(
    'AUTO_FORM_DATA',
);

export const AUTO_FORM_INITAL_DATA = new InjectionToken<any>(
    'AUTO_FORM_INITIAL_DATA',
);

export const AUTO_FORM_EXPOSITION = new InjectionToken<any>(
  'AUTO_FORM_EXPOSITION'
)

export interface FormTypeRegister {
    [id: string]: Type<BaseAutoFormComponent>;
}

export const AUTO_FORM_TYPE_REGISTER = new InjectionToken<FormTypeRegister>(
    'AUTO_FORM_TYPE_REGISTER',
);


@Directive({})
export class BaseAutoFormComponent {
    private pFormData: AutoFormData;

    formGroup: FormGroup;

    @Input()
    set formData(formData: AutoFormData) {
        this.pFormData = formData;

        this.formGroup = this.autoFormBuilder.getFormGroup(this.pFormData);
    }
    get formData(): AutoFormData {
        return this.pFormData;
    }

    exposition: any;

    constructor(
        @Optional() @Inject(AUTO_FORM_DATA) formData: AutoFormData,
        @Optional() @Inject(AUTO_FORM_INITAL_DATA) formInitialData: any,
        @Optional() @Inject(AUTO_FORM_EXPOSITION) exposition: any,
        protected autoFormBuilder: AutoFormGroupBuilder,
    ) {
        this.exposition = exposition;
        if (formData) {
            this.formData = formData;
            if (formInitialData) this.formGroup.setValue(formInitialData);
        }
    }
}
