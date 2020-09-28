import { NgModule } from '@angular/core';
import { ChipAutoCompleteComponent } from './chip-autocomplete';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatOptionModule } from '@angular/material/core';
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
