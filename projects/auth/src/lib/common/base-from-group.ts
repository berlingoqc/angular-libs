import { UntypedFormGroup } from '@angular/forms';
import { EventEmitter, Output, Directive } from '@angular/core';

@Directive()
export abstract class BaseFormDialog {
  formGroup: UntypedFormGroup;

  exceptionRequest: string;

  @Output() beginning = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  submit() {
    if(this.formGroup.valid) {
      this.submitHandler();
    }
  }

  abstract submitHandler();

}
