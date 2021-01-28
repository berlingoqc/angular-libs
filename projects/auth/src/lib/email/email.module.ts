import { NgModule } from '@angular/core';
import { EmailPreviewComponent, EmailTemplateTableComponent } from './component';
import { EmailTemplateAPI } from './service/email-render.api';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatChipsModule } from '@angular/material/chips';
import { FormExtraModule } from '@berlingoqc/ngx-common';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { AutoTableModule } from '@berlingoqc/ngx-autotable';

@NgModule({
  declarations: [
    EmailPreviewComponent,
    EmailTemplateTableComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,

    FormExtraModule,

    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatChipsModule,

    AutoTableModule
  ],
  exports: [
    EmailPreviewComponent,
    EmailTemplateTableComponent
  ],
  providers: [
    EmailTemplateAPI
  ]
})
export class EmailModule { }
