import { Component } from '@angular/core';
import { contactTemplate, BaseContactComponent } from './base.component';
import { ContactConfig } from '../model/config';

@Component({
  selector: 'alb-phone',
  template: contactTemplate,
})
export class PhoneNumberComponent extends BaseContactComponent {
  constructor(config: ContactConfig) {
    super(config, 'telephone');
  }

  getHref = () => `tel:${this.value}`;
}
