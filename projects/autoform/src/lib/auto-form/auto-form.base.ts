import { Directive, Inject, InjectionToken, Input, Optional, Type } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { resolveData } from '@berlingoqc/ngx-common';
import { take } from 'rxjs/operators';
import { AutoFormData } from '../models';
import { BaseFormContainer } from '../models/form-container/form-container';
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
export class BaseAutoFormComponent<T extends BaseFormContainer = BaseFormContainer> {
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

    get typeData(): T {
      return (this.formData.typeData ?? {}) as T
    }

    exposition: any;

    constructor(
        @Optional() @Inject(AUTO_FORM_DATA) formData: AutoFormData,
        @Optional() @Inject(AUTO_FORM_INITAL_DATA) formInitialData: any,
        @Optional() @Inject(AUTO_FORM_EXPOSITION) exposition: any,
        protected autoFormBuilder: AutoFormGroupBuilder,
    ) {
        this.exposition = exposition;
        this.exposition['this'] = this;
        if (formData) {
            this.formData = formData;
            if (formInitialData) this.formGroup.setValue(formInitialData);
            this.initialize();
       }
    }

    private initialize() {
      if (this.formData.event?.afterFormCreated) {
        this.formData.event.afterFormCreated(this.formGroup);
      }
      if (this.formData.event?.initialData) {
              resolveData(this.formData.event.initialData)
                .pipe(take(1))
                .subscribe((data) => {
                  // Neeed to adjust the
                  this.formGroup.patchValue(data);
                });
            }

    }
}
