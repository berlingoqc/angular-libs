import { NgModule } from '@angular/core';

import { SSOSettingsService } from './service';
import { SsoInfoComponent } from './component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatCheckboxModule,
    MatChipsModule,
  ],
  declarations: [
    SsoInfoComponent
  ],
  exports: [SsoInfoComponent],
  providers: [SSOSettingsService],
  entryComponents: [SsoInfoComponent]
})
export class SSOModule {

}