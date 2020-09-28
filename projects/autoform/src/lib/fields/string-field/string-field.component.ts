import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {
  BaseFieldComponent,
  ComponentRegisterService,
} from '../../service/component-register';
import { FormControl, ControlValueAccessor } from '@angular/forms';
import { StringProperty } from '../../models/properties/string';

@Component({
  selector: 'autoform-string-field',
  templateUrl: './string-field.component.html',
  styleUrls: ['./string-field.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class StringFieldComponent
  extends BaseFieldComponent<StringProperty, FormControl>
  implements OnInit, ControlValueAccessor {
  constructor(componentRegister: ComponentRegisterService) {
    super(componentRegister);
  }

  get type() {
    if (this.data.subtype) {
      if (this.data.subtype.name == 'email') {
        return 'email';
      }
    }
    return 'text';
  }

  registerOnChange(fnChange) {
    console.log('REGISTER ON CHANGE');
  }

  registerOnTouched(fnTouch) {}

  writeValue(value: any) {
    console.log('WRITING VALUE');
  }
}
