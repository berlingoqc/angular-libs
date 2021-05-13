import { Component } from "@angular/core";
import { DateProperty } from "../models/properties/date";
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

      <input
        [required]="data.required"
        [placeholder]="data.placeholder"
        [formControl]="abstractControl"
        *ngIf="!data.subtype" #myInput matInput [matDatepicker]="picker">
      <mat-datepicker-toggle *ngIf="!data.subtype" matSuffix [for]="picker">
        <mat-icon matDatepickerToggleIcon>{{data.customIcon ? data.customIcon: 'today'}}</mat-icon>
      </mat-datepicker-toggle>

      <mat-datepicker #picker></mat-datepicker>

      <mat-date-range-input [formGroup]="abstractControl" *ngIf="data.subtype?.name === 'date-range'" [rangePicker]="rangepicker">
        <input #myInput formControlName="start" [required]="data.required" matStartDate placeholder="Start">
        <input matEndDate formControlName="end" [required]="data.required" placeholder="End">
      </mat-date-range-input>

      <mat-datepicker-toggle *ngIf="data.subtype?.name === 'date-range'" matSuffix [for]="rangepicker">
        <mat-icon matDatepickerToggleIcon>{{data.customIcon ? data.customIcon: 'today'}}</mat-icon>
      </mat-datepicker-toggle>

      <mat-date-range-picker #rangepicker></mat-date-range-picker>


      <template-content
        matPrefix
        *ngIf="data.preffix"
        [content]="data.preffix"
      ></template-content>

       <!--AFFICHAGE DU HINT-->
      <!--
      <mat-hint
        *ngIf="data.hintAlign && data.hintAlign == 'end'"
        align="end"
      >
        <template-content
          [content]="data.hint"
          [parent]="myInput"
          [content]="data"
        ></template-content>
      </mat-hint>
      <mat-hint
        *ngIf="(!data.hintAlign || data.hintAlign == 'start') && myInput"
        align="start"
      >
        <template-content
          [content]="data.hint"
          [parent]="myInput"
          [content]="data"
        ></template-content>
      </mat-hint>
      -->

      <!--Affichage des erreurs-->
      <mat-error *ngFor="let e of data.errors | errorFilter: abstractControl">{{
        e.text
      }}</mat-error>

    </mat-form-field>
  `,
})
export class MyMatDate extends BaseFormField<DateProperty> {
}
