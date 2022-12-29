import { NgModule } from '@angular/core';
import { ChipAutoCompleteComponent } from './chip-autocomplete';
import { MatLegacyAutocompleteModule as MatAutocompleteModule } from '@angular/material/legacy-autocomplete';
import { MatLegacyChipsModule as MatChipsModule } from '@angular/material/legacy-chips';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyOptionModule as MatOptionModule } from '@angular/material/legacy-core';
import { CommonModule } from '@angular/common';




@NgModule({
  declarations: [
    ChipAutoCompleteComponent,
  ],
  exports: [
    ChipAutoCompleteComponent
  ],
  imports: [
    CommonModule,
    MatAutocompleteModule,
    MatChipsModule,
    MatOptionModule,
    MatIconModule,
    MatFormFieldModule,
    ReactiveFormsModule
  ]
})
export class ChipAutoCompleteModule {

}
