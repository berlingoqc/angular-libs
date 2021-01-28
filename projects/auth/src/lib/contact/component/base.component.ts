import { ContactConfig } from '../model/config';
import { Input, OnInit, Directive } from '@angular/core';

export const contactTemplate = `{{value}}`;

@Directive()
export abstract class BaseContactComponent implements OnInit {
  @Input() dep: string;

  value: string;

  constructor(public config: ContactConfig, public id: string) {}

  ngOnInit() {
    if (this.dep) {
      this.value = this.config[this.id][this.dep];
    } else {
      this.value = Object.values(this.config[this.id])[0] as string;
    }
  }

  abstract getHref();

  click() {
    window.location.href = this.getHref();
  }
}
