import {
  Component,
  ViewEncapsulation,
} from '@angular/core';

import { ArrayProperty } from '../../models';
import { BaseFieldComponent, ComponentRegisterService } from '../../service/component-register';
import { AutoFormArray } from '../../helper/form-group/auto-form-array';

@Component({
  selector: 'autoform-array-field',
  templateUrl: './array-field.component.html',
  styleUrls: ['./array-field.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ArrayFieldComponent
  extends BaseFieldComponent<ArrayProperty, AutoFormArray>
{

  constructor(
    register: ComponentRegisterService,
  ) {
    super(register);
  }
}
