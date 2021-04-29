import {
    Component,
    OnInit,
    Input,
    Injector,
    Inject,
    Optional,
} from '@angular/core';
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
        <ng-container
            *ngComponentOutlet="
                formTypeRegister[formData.type]
                    ? formTypeRegister[formData.type]
                    : forms.simple;
                injector: customInjector
            "
        ></ng-container>
    `,
})
export class AutoFormComponent implements OnInit {
    @Input() formData: AutoFormData;

    @Input() initialData: any;

    forms = {
        simple: AutoFormSimpleComponent,
    };

    customInjector: Injector;


    get exposition(): any {
      console.log(this.expositionObject);
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
    ) {
        if (formData) {
            this.formData = formData;
        }
    }

    ngOnInit(): void {
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
}
