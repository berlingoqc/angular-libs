import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { MultiInputMatInput } from '../models/component/multi-input-mat-input';
import { AutocompleteSubType } from '../models/properties/subtype/autocomplete';
import { BaseFormField } from './base-form-field';

// MyMatInput est une wrapper autour de la directive matInput
// pour permettre de paramètrer tous les configurations possibles
// Cas a inclure:
//    * Button en suffix et preffix
//    * Custom ErrorStateMatcher
//    * Errors message
//    * Hints
//    * TextArea
//    *
@Component({
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
      <input
        #myInput
        matInput
        *ngIf="!multipart && !textarea"
        [autoFormDecorator]="data.decorators"
        autoFormElementID="input"
        [required]="data.required"
        [placeholder]="data.placeholder"
        type="{{ type }}"
        maxlength="{{ data.maxlength }}"
        [formControl]="abstractControl"
        [matAutocomplete]="auto"
      />
      <textarea
        #myInput
        matInput
        *ngIf="textarea"
        [autoFormDecorator]="data.decorators"
        autoFormElementID="input"
        [required]="data.required"
        [placeholder]="data.placeholder"
        maxlength="{{ data.maxlength }}"
        [formControl]="abstractControl"
      ></textarea>

      <autoform-multipart-matinput
        #myInput
        *ngIf="multipart"
        [autoFormDecorator]="data.decorators"
        autoFormElementID="input"
        [formControl]="abstractControl"
        [component]="multipart"
        [placeholder]="data.placeholder"
      ></autoform-multipart-matinput>

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
          [context]="data"
        ></template-content>
      </mat-hint>
      <mat-hint
        *ngIf="(!hintAlign || hintAlign == 'start') && currentInput"
        align="start"
      >
        <template-content
          [content]="hint"
          [parent]="currentInput"
          [context]="data"
        ></template-content>
      </mat-hint>

      <!--Affichage des erreurs-->
      <mat-error *ngFor="let e of data.errors | errorFilter: abstractControl">{{
        e.text
      }}</mat-error>

      <!-- Affichage de l'autocomplete -->
      <mat-autocomplete #auto="matAutocomplete">
        <ng-container *ngIf="autocomplete">
          <mat-option
            *ngFor="let d of autocomplete.items | dataResolver"
            [value]="d"
            >{{ d }}</mat-option
          >
        </ng-container>
      </mat-autocomplete>
    </mat-form-field>
  `,
  selector: 'my-mat-input',
})
export class MyMatInput extends BaseFormField {
  // Si l'input est un textarea
  @Input() textarea;
  @Input() multipart?: MultiInputMatInput;

  // Configration si typ est number
  @Input() min?: number;
  @Input() max?: number;
  @Input() step?: number;

  @Input() autocomplete: AutocompleteSubType;
}
