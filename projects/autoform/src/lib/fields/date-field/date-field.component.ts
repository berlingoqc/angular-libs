import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ControlValueAccessor, FormControl, FormGroup } from '@angular/forms';
import { FormObject } from 'dist/autoform/public-api';
import { DateProperty } from '../../models/properties/date';
import { BaseFieldComponent, ComponentRegisterService } from '../../service/component-register';

@Component({
  selector: 'lib-date-field',
  templateUrl: './date-field.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class DateFieldComponent
  extends BaseFieldComponent<DateProperty, FormControl>
{

  rangeFormControl: FormObject;

  constructor(componentRegistry: ComponentRegisterService) {
    super(componentRegistry);
  }

  ngOnInit() {
    super.ngOnInit();
  }

}
