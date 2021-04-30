import { Component } from "@angular/core";
import { BaseFormField } from "./base-form-field";




@Component({
  selector: 'my-mat-date',
  template: `
    <mat-form-field
      style="width: 100%"
      [autoFormDecorator]="data.decorators"
      autoFormElementID="formField"
      [appearance]="data.appearance"
      [hideRequiredMarker]="data.hideRequired"
      [floatLabel]="data.floatLabel"
    >
      <mat-label>
        <template-content
          *ngIf="data.displayName; else simpletitle"
          [content]="data.displayName"
        ></template-content>
        <ng-template #simpletitle>{{data.name}}</ng-template>
      </mat-label>

      <input #myInput matInput [matDatepicker]="picker">
      <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
      <mat-datepicker #picker></mat-datepicker>

    </mat-form-field>
  `,
})
export class MyMatDate extends BaseFormField {



}
