import { LayoutExtraModule, FormExtraModule } from '@berlingoqc/ngx-common';
import { NgModule } from '@angular/core';
import { AdminControlComponent, AdminUserEditComponent } from './component';
import { EmailModule } from '../email';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatLegacySlideToggleModule as MatSlideToggleModule } from '@angular/material/legacy-slide-toggle';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatLegacyChipsModule as MatChipsModule } from '@angular/material/legacy-chips';
import { MatLegacyAutocompleteModule as MatAutocompleteModule } from '@angular/material/legacy-autocomplete';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyTableModule as MatTableModule } from '@angular/material/legacy-table';
import { MatLegacyCheckboxModule as MatCheckboxModule } from '@angular/material/legacy-checkbox';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { TranslateModule } from '@ngx-translate/core';
import { MatLegacyPaginatorModule as MatPaginatorModule } from '@angular/material/legacy-paginator';
import { UserModule } from '../user/user.module';
import { AdminPageModule } from '../common/admin-page.module';
import { SSOModule } from '../sso';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { InvitationModule } from '../invitation';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';

@NgModule({
    imports: [
        CommonModule,
        FormExtraModule,
        AdminPageModule,
        LayoutExtraModule,
        UserModule,
        EmailModule,
        SSOModule,
        InvitationModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSlideToggleModule,
        MatDatepickerModule,
        MatChipsModule,
        MatButtonModule,
        MatAutocompleteModule,
        MatTableModule,
        MatPaginatorModule,
        MatCheckboxModule,
        ClipboardModule,
        MatIconModule,
        TranslateModule,
    ],
    declarations: [
        AdminControlComponent,
        AdminUserEditComponent,
    ],
    exports: [
        AdminControlComponent,
    ]
})
export class AdminModule { }
