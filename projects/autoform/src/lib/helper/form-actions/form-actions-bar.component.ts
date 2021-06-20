import { Component, Input } from "@angular/core";
import { Button } from "@berlingoqc/ngx-common";
import { BaseAutoFormComponent } from "../../auto-form/auto-form.base";
import { FormActions } from "./form-actions";



@Component({
  selector: 'autoform-actions-bar',
  template: `
    <app-buttons-row
      [buttons]="buttons"
    ></app-buttons-row>
  `,
})
export class FormActionsBarComponent {

  mActions: FormActions;
  @Input() set actions(a: FormActions) {
    this.mActions = a;
    if (!this.mActions) {
      this.mActions = {
        submit: {title: 'Submit'},
      }
    }
    if (this.mActions.submit) {
      this.mActions.submit.click = () => this.submit();
    }
    if (this.mActions.reset)
      this.mActions.reset.click = () => this.reset();
    this.buttons = Object.values(this.mActions);
  }

  @Input() component: BaseAutoFormComponent;


  buttons: Button[];

  submit() {
    if (this.component.formGroup.valid) {
      if (this.component.formData.event) {
        this.component.formData.event
              .submit(this.component.formGroup.value)
              .subscribe();
      }
    } else {
      this.component.formGroup.markAllAsTouched();
    }
  }

  reset() {
    this.component.formGroup.reset();
  }


}
