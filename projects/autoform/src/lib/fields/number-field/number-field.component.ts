import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {
  BaseFieldComponent,
  ComponentRegisterService,
} from '../../service/component-register';
import { UntypedFormControl } from '@angular/forms';
import { NumberProperty } from '../../models/properties/number';

@Component({
  selector: 'autoform-number-field',
  templateUrl: './number-field.component.html',
  styleUrls: ['./number-field.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class NumberFieldComponent
  extends BaseFieldComponent<NumberProperty, UntypedFormControl>
  implements OnInit {
  prefix: string;
  suffix: string;

  constructor(componentRegister: ComponentRegisterService) {
    super(componentRegister);
  }

  ngOnInit(): void {
    if (!this.data.subtype) {
      this.data.subtype = { name: '' };
    } else {
      if (this.data.subtype.name === 'money') {
        this.prefix = '$&nbsp;';
      }
    }
  }

  getClass() {
    if (this.data.subtype && this.data.subtype.name === 'money') {
      return ['align-right', 'disable-spin'];
    }
  }

  getStyle() {}
}
