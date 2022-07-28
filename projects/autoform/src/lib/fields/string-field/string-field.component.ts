import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {
  BaseFieldComponent,
  ComponentRegisterService,
} from '../../service/component-register';
import { UntypedFormControl, ControlValueAccessor } from '@angular/forms';
import { StringProperty } from '../../models/properties/string';

@Component({
  selector: 'autoform-string-field',
  templateUrl: './string-field.component.html',
  styleUrls: ['./string-field.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class StringFieldComponent
  extends BaseFieldComponent<StringProperty, UntypedFormControl>
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
  }

  registerOnTouched(fnTouch) {}

  writeValue(value: any) {
  }
}
