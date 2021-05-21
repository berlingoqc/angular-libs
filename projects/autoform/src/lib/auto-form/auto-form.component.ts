import {
    Component,
    OnInit,
    Input,
    Injector,
    Inject,
    Optional,
    AfterViewInit,
} from '@angular/core';
import { ComponentFieldService } from '../fields/field.service';
import { AutoFormData } from '../models/form';
import { AutoFormSimpleComponent } from './auto-form-simple/auto-form-simple.component';
import {
    AUTO_FORM_DATA,
  AUTO_FORM_EXPOSITION,
    AUTO_FORM_INITAL_DATA,
    AUTO_FORM_TYPE_REGISTER,
    FormTypeRegister,
} from './auto-form.base';

@Component({
    selector: 'autoform-form',
    template: `
      <ng-container *ngIf="pFormData">
        <ng-container
            *ngComponentOutlet="
                formTypeRegister[pFormData.type]
                    ? formTypeRegister[pFormData.type]
                    : forms.simple;
                injector: customInjector
            "
        ></ng-container>
       </ng-container>
   `,
})
export class AutoFormComponent {
    pFormData: AutoFormData;
    @Input()
    set formData( formData: AutoFormData) {
      this.pFormData = formData;
      this.expositionObject = {};
        this.customInjector = Injector.create({
            providers: [
                { provide: AUTO_FORM_DATA, useValue: this.formData },
                {
                    provide: AUTO_FORM_INITAL_DATA,
                    useValue: this.initialData,
                },
                {
                  provide: AUTO_FORM_EXPOSITION,
                  useValue: this.expositionObject,
                }
            ],
            parent: this.injector,
        });
    }
    get formData() {
      return this.pFormData;
    }

    @Input() initialData: any;

    forms = {
        simple: AutoFormSimpleComponent,
    };

    customInjector: Injector;


    get exposition(): any {
      return this.expositionObject;
    }

    private expositionObject: any;

    constructor(
        @Optional()
        @Inject(AUTO_FORM_DATA)
        formData: AutoFormData,
        @Inject(AUTO_FORM_TYPE_REGISTER)
        public formTypeRegister: FormTypeRegister,
        private injector: Injector,
        public componentFieldService: ComponentFieldService,
    ) {
        if (formData) {
            this.formData = formData;
        }
    }
}
