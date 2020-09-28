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

  forms = {
    simple: AutoFormSimpleComponent,
  };

  customInjector: Injector;

  constructor(
    @Optional()
    @Inject(AUTO_FORM_DATA)
    formData: AutoFormData,
    @Inject(AUTO_FORM_TYPE_REGISTER)
    public formTypeRegister: FormTypeRegister,
    private injector: Injector
  ) {
    if (formData) {
      this.formData = formData;
    }
  }

  ngOnInit(): void {
    this.customInjector = Injector.create({
      providers: [{ provide: AUTO_FORM_DATA, useValue: this.formData }],
      parent: this.injector,
    });
  }
}
