import { NgModule } from '@angular/core';
import {
  InvitationOrganisationComponent,
  NewOrganisationComponent,
  OrganisationInvitationTableComponent,
  OrganisationManagerDashboardComponent,
  OrganisationTableComponent,
  OrganisationCardComponent,
  AlbInvitationBottomSheet,
} from './component';
import {
  DynamicStyleProviderModule,
  CommonPipeModule,
  LayoutExtraModule,
} from '@berlingoqc/ngx-common';
import { CommonModule } from '@angular/common';
import { MatBadgeModule } from '@angular/material/badge';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { AdminPageModule } from '../common';
import { TranslateModule } from '@ngx-translate/core';
import { OrgUserLinkAPI, OrganisationAPI } from './service';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { OrgGuard } from './guard';
import { OrgUserDirective } from './directive';
import { AdminModule } from '../admin';
import { SelectOrganisationComponent } from './component/select-organisation/select-organisation.component';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AutoTableModule } from '@berlingoqc/ngx-autotable';

@NgModule({
  imports: [
    CommonModule,
    CommonPipeModule,

    LayoutExtraModule,
    DynamicStyleProviderModule,

    AdminPageModule,
    AdminModule,

    MatBadgeModule,
    MatIconModule,
    MatChipsModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatSelectModule,
    MatFormFieldModule,

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
