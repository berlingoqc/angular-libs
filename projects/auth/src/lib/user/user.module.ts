import { NgModule } from '@angular/core';
import { OpenUserEditButton, UserNameComponent, UserEditComponent, ExtraFieldsFormComponent } from './component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DynamicStyleProviderModule } from '@berlingoqc/ngx-common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatChipsModule } from '@angular/material/chips';
import { MatCardModule } from '@angular/material/card';
import { AuthCommonModule } from '../common/auth-common.module';
import { FormExtraModule, CommonPipeModule } from '@berlingoqc/ngx-common';
import { TranslateModule } from '@ngx-translate/core';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  imports: [
    CommonModule,

    CommonPipeModule,
    AuthCommonModule,
    FormExtraModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatChipsModule,
    MatCardModule,


    TranslateModule,
    DynamicStyleProviderModule,

  ],
  declarations: [
    OpenUserEditButton,
    UserNameComponent,
    UserEditComponent,
    ExtraFieldsFormComponent,
  ],
  exports: [
    OpenUserEditButton,
    UserNameComponent,
    UserEditComponent,
    ExtraFieldsFormComponent,
  ],
  entryComponents: [
    UserEditComponent
  ]
})
export class UserModule { }
