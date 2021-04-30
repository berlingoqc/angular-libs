import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { resolveData, unsubscriber } from '@berlingoqc/ngx-common';
import { Subject, Subscription } from 'rxjs';
import { SelectComponent } from '../models/component/select.component';
import { BaseFormField } from './base-form-field';

@Component({
  selector: 'autoform-mat-select',
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
        >
        </template-content>
        <ng-template #simpletitle>
          {{ data.name }}
        </ng-template>
      </mat-label>

      <mat-select
        #myInput
        *ngIf="!component.type || component.type == 'mat'"
        [formControl]="abstractControl"
        [required]="data.required"
      >
        <ng-container *ngIf="component.noneOption">
          <mat-option>
            <template-content
              [content]="component.noneOption"
            ></template-content>
          </mat-option>
        </ng-container>
        <ng-container>
          <mat-option
            *ngFor="let value of options"
            [value]="value"
          >
            <template-content [content]="component.options.displayContent" [context]="value"></template-content>
          </mat-option>
        </ng-container>
      </mat-select>

      <select
        #myInput
        matNativeControl
        required
        [required]="data.required"
        *ngIf="component?.type == 'native'"
      >
        <ng-container *ngIf="component.noneOption">
          <option>
            <template-content
              [content]="component.noneOption"
            ></template-content>
          </option>
        </ng-container>
        <ng-container>
          <!--<option
            *ngFor="let value of $any(component.options.options | dataResolver)"
            [value]="value"
          >
            <template-content [content]="option.display" [context]="value"></template-content>
          </option>-->
        </ng-container>
      </select>

      <!--Ajout du prefix-->
      <template-content
        matPrefix
        *ngIf="preffix"
        [content]="preffix"
      ></template-content>
      <!--Ajout du suffix-->
      <template-content
        *ngIf="suffix"
        matSuffix
        [parent]="currentInput"
        [context]="data"
        [content]="suffix"
      ></template-content>

      <!--AFFICHAGE DU HINT-->
      <mat-hint
        *ngIf="hintAlign && hintAlign == 'end' && currentInput"
        align="end"
      >
        <template-content
          [content]="hint"
          [parent]="currentInput"
          [content]="data"
        ></template-content>
      </mat-hint>
      <mat-hint
        *ngIf="(!hintAlign || hintAlign == 'start') && currentInput"
        align="start"
      >
        <template-content
          [content]="hint"
          [parent]="currentInput"
          [content]="data"
        ></template-content>
      </mat-hint>


      <!--Affichage des erreurs
      <mat-error *ngFor="let e of data.errors | errorFilter: abstractControl">{{
        e.text
      }}</mat-error>-->
    </mat-form-field>
  `,
})
@unsubscriber
export class MyMatSelectComponent extends BaseFormField implements OnInit{
  @Input() component: SelectComponent;

  @Input() options: any;

  resolvingSub: Subscription;

  constructor(cdr: ChangeDetectorRef) {
    super(cdr);
  }

  ngOnInit() {
    this.resolvingSub = resolveData((this.component.options.options as any).value).subscribe((data) => {
      this.options = data;
    });
  }
}
