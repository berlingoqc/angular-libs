import { NgModule } from '@angular/core';
import {
  InvitationOrganisationComponent,
  NewOrganisationComponent,
  OrganisationInvitationTableComponent,
  OrganisationManagerDashboardComponent,
  OrganisationTableComponent,
  OrganisationCardComponent,
  AlbInvitationBottomSheet,
  OrganisationDashboardComponent,
} from './component';
import {
  DynamicStyleProviderModule,
  CommonPipeModule,
  LayoutExtraModule,
} from '@berlingoqc/ngx-common';
import { CommonModule } from '@angular/common';
import { MatBadgeModule } from '@angular/material/badge';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyChipsModule as MatChipsModule } from '@angular/material/legacy-chips';
import { AdminPageModule } from '../common';
import { TranslateModule } from '@ngx-translate/core';
import { OrgUserLinkAPI, OrganisationAPI } from './service';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { OrgGuard } from './guard';
import { OrgUserDirective } from './directive';
import { AdminModule } from '../admin';
import { SelectOrganisationComponent } from './component/select-organisation/select-organisation.component';
import { MatLegacySelectModule as MatSelectModule } from '@angular/material/legacy-select';
import { ReactiveFormsModule } from '@angular/forms';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { AutoTableModule } from '@berlingoqc/ngx-autotable';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { UserModule } from '../user';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { ButtonsRowModule } from '@berlingoqc/ngx-common';

@NgModule({
  imports: [
    CommonModule,
    CommonPipeModule,

    LayoutExtraModule,
    DynamicStyleProviderModule,

    AdminPageModule,
    AdminModule,
    UserModule,

    MatBadgeModule,
    MatIconModule,
    MatInputModule,
    MatDialogModule,
    MatChipsModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatSelectModule,
    MatFormFieldModule,

    ButtonsRowModule,

    ReactiveFormsModule,

    AutoTableModule,
    TranslateModule,
  ],
  declarations: [
    InvitationOrganisationComponent,
    NewOrganisationComponent,
    OrganisationInvitationTableComponent,
    OrganisationManagerDashboardComponent,
    OrganisationTableComponent,
    OrganisationCardComponent,
    OrganisationDashboardComponent,
    AlbInvitationBottomSheet,
    OrgUserDirective,
    SelectOrganisationComponent,
  ],
  exports: [
    SelectOrganisationComponent,
    InvitationOrganisationComponent,
    OrganisationTableComponent,
    OrganisationCardComponent,
    OrgUserDirective,
    OrganisationInvitationTableComponent,
  ],
  providers: [OrgUserLinkAPI, OrganisationAPI, OrgUserDirective, OrgGuard],
})
export class OrganisationModule {}
