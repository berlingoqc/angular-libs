import { Component, OnInit, Input, Optional, Inject } from '@angular/core';
import { BaseAutoFormComponent, AUTO_FORM_DATA } from '../auto-form.base';

@Component({
  selector: 'autoform-form-simple',
  templateUrl: './auto-form-simple.component.html',
})
export class AutoFormSimpleComponent
  extends BaseAutoFormComponent
  implements OnInit {
  ngOnInit(): void {}

  clearAll() {}
}
