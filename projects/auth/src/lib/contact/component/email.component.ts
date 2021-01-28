import { Component, OnInit, Input } from '@angular/core';
import { ContactConfig } from '../model/config';
import { BaseContactComponent, contactTemplate } from './base.component';

@Component({
  selector: 'alb-email',
  template: contactTemplate,
})
export class EmailComponent extends BaseContactComponent {
  constructor(config: ContactConfig) {
    super(config, 'email');
  }

  getHref = () => `mailto:${this.value}`;
}
