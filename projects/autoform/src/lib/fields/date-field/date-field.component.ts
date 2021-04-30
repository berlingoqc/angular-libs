import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ControlValueAccessor, FormControl } from '@angular/forms';
import { DateProperty } from '../../models/properties/date';
import { BaseFieldComponent, ComponentRegisterService } from '../../service/component-register';

@Component({
  selector: 'lib-date-field',
  templateUrl: './date-field.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class DateFieldComponent
  extends BaseFieldComponent<DateProperty, FormControl>
  implements OnInit
{

  constructor(componentRegistry: ComponentRegisterService) {
    super(componentRegistry);
  }

  ngOnInit(): void {
  }

}
