import { NgModule } from '@angular/core';
import { EmailPreviewComponent, EmailTemplateTableComponent } from './component';
import { EmailTemplateAPI } from './service/email-render.api';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatLegacyChipsModule as MatChipsModule } from '@angular/material/legacy-chips';
import { FormExtraModule } from '@berlingoqc/ngx-common';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
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
