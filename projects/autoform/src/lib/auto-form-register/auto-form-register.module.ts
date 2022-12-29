import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatLegacySelectModule as MatSelectModule } from '@angular/material/legacy-select';
import { RouterModule } from '@angular/router';
import { AutoFormModule } from '../auto-form.module';
import { AutoFormRegisterComponent } from './auto-form-register.component';
import { FormRegistry } from './form-registry';
import { ModelRegistry } from './model-registry';
import { ModelsSelectComponent } from './models-select.component';

@NgModule({
  declarations: [AutoFormRegisterComponent, ModelsSelectComponent],
  imports: [
    CommonModule,
    AutoFormModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatFormFieldModule,

    RouterModule,
  ],
  exports: [AutoFormRegisterComponent, ModelsSelectComponent],
  providers: [FormRegistry, ModelRegistry],
})
export class AutoFormRegister {}
