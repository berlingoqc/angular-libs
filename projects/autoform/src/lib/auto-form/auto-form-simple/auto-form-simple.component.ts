import { Component, OnInit, Input, Optional, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AutoFormData } from '../../models';
import { AutoFormGroupBuilder } from '../../service/auto-form-group-builder';
import { BaseAutoFormComponent, AUTO_FORM_DATA } from '../auto-form.base';

@Component({
  selector: 'autoform-form-simple',
  templateUrl: './auto-form-simple.component.html',
})
export class AutoFormSimpleComponent
  extends BaseAutoFormComponent
  implements OnInit {
  ngOnInit(): void {}

  submit() {
    console.log(this.formGroup);
    if (this.formGroup.valid) {
      this.formData.onSubmitValid(this.formGroup.value)
    } else {
      this.formGroup.markAllAsTouched();
    }
  }

  clearAll() {}
}
