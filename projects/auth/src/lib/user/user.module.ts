import { NgModule } from '@angular/core';
import { OpenUserEditButton, UserNameComponent, UserEditComponent, ExtraFieldsFormComponent, UserManagingComponent } from './component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { DynamicStyleProviderModule, LayoutExtraModule } from '@berlingoqc/ngx-common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatLegacyChipsModule as MatChipsModule } from '@angular/material/legacy-chips';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { AuthCommonModule } from '../common/auth-common.module';
import { FormExtraModule, CommonPipeModule } from '@berlingoqc/ngx-common';
import { TranslateModule } from '@ngx-translate/core';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { UserComboboxComponent } from './component/user-combobox/user-combobox.component';
import { MatLegacySelectModule as MatSelectModule } from '@angular/material/legacy-select';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { MatLegacyTableModule as MatTableModule } from '@angular/material/legacy-table';
import { MatLegacyCheckboxModule as MatCheckboxModule } from '@angular/material/legacy-checkbox';
import { MatLegacyPaginatorModule as MatPaginatorModule } from '@angular/material/legacy-paginator';
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
