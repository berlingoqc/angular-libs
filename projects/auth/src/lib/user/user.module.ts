import { NgModule } from '@angular/core';
import { OpenUserEditButton, UserNameComponent, UserEditComponent, ExtraFieldsFormComponent, UserManagingComponent } from './component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DynamicStyleProviderModule, LayoutExtraModule } from '@berlingoqc/ngx-common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatChipsModule } from '@angular/material/chips';
import { MatCardModule } from '@angular/material/card';
import { AuthCommonModule } from '../common/auth-common.module';
import { FormExtraModule, CommonPipeModule } from '@berlingoqc/ngx-common';
import { TranslateModule } from '@ngx-translate/core';
import { MatInputModule } from '@angular/material/input';
import { UserComboboxComponent } from './component/user-combobox/user-combobox.component';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { AdminPageModule } from '../common/admin-page.module';

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
        MatSelectModule,
        MatButtonModule,
        MatIconModule,
        MatDialogModule,
        MatTableModule,
        MatCheckboxModule,
        MatSelectModule,
        MatPaginatorModule,
        FormsModule,
        ReactiveFormsModule,
        ClipboardModule,
        AdminPageModule,
        LayoutExtraModule,
        TranslateModule,
        DynamicStyleProviderModule,
    ],
    declarations: [
        OpenUserEditButton,
        UserNameComponent,
        UserEditComponent,
        UserManagingComponent,
        UserComboboxComponent,
        ExtraFieldsFormComponent,
    ],
    exports: [
        OpenUserEditButton,
        UserNameComponent,
        UserEditComponent,
        UserManagingComponent,
        UserComboboxComponent,
        ExtraFieldsFormComponent,
    ]
})
export class UserModule { }
