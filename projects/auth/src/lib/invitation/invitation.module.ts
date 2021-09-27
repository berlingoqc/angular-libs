import { NgModule } from '@angular/core';
import { InviteUserDialogComponent, MyInvitationsComponent, TableInvitationsComponent } from './component';
import { MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DynamicStyleProviderModule, FormExtraModule } from '@berlingoqc/ngx-common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AccountModule } from '../account';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';

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
  ],
  entryComponents: [InviteUserDialogComponent]
})
export class InvitationModule { }
