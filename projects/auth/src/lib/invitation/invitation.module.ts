import { NgModule } from '@angular/core';
import { InviteUserDialogComponent, MyInvitationsComponent, TableInvitationsComponent } from './component';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { DynamicStyleProviderModule, FormExtraModule } from '@berlingoqc/ngx-common';
import { MatLegacyProgressSpinnerModule as MatProgressSpinnerModule } from '@angular/material/legacy-progress-spinner';
import { AccountModule } from '../account';
import { MatBadgeModule } from '@angular/material/badge';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';

@NgModule({
    imports: [
        CommonModule,
        MatDialogModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatBadgeModule,
        MatButtonModule,
        MatProgressSpinnerModule,
        AccountModule,
        FormExtraModule,
        DynamicStyleProviderModule,
    ],
    declarations: [
        InviteUserDialogComponent,
        MyInvitationsComponent,
        TableInvitationsComponent,
    ],
    exports: [
        InviteUserDialogComponent,
    ]
})
export class InvitationModule { }
