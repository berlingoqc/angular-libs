import { LayoutExtraModule, FormExtraModule } from '@berlingoqc/ngx-common';
import { NgModule } from '@angular/core';
import { AdminControlComponent, AdminUserEditComponent } from './component';
import { EmailModule } from '../email';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatChipsModule } from '@angular/material/chips';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { TranslateModule } from '@ngx-translate/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { UserModule } from '../user/user.module';
import { AdminPageModule } from '../common/admin-page.module';
import { SSOModule } from '../sso';
import { MatInputModule } from '@angular/material/input';
import { InvitationModule } from '../invitation';
import { MatButtonModule } from '@angular/material/button';

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
