import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { CreateUserComponent } from './component/create-user/create-user.component';
import { AuthDialogComponent } from './component/auth-dialog/auth-dialog.component';
import { ForgotPasswordComponent, SelectAuthFactorComponent, ValidAccountComponent, AcceptAgrementComponent, ValidInvitationComponent, AccountHeaderComponent } from './component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { AuthCommonModule } from '../common';
import { FormExtraModule, DynamicStyleProviderModule } from '@berlingoqc/ngx-common';
import { MatStepperModule } from '@angular/material/stepper';
import { MatLegacyListModule as MatListModule } from '@angular/material/legacy-list';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatLegacyCheckboxModule as MatCheckboxModule } from '@angular/material/legacy-checkbox';
import { UserModule } from '../user';
import { AskConnectDirective, CatchRedirectionDirective, AskConnectComponent } from './directive';
import { RoleGuard } from './guard';
import { MatLegacyButtonModule as MatButtonModule } from "@angular/material/legacy-button";
import { RouterModule } from "@angular/router";

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatStepperModule,
    MatExpansionModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule,
    RouterModule,

    ScrollingModule,

    FormExtraModule,

    DynamicStyleProviderModule,

    AuthCommonModule,
    UserModule

  ],
  declarations: [
    AuthDialogComponent,
    CreateUserComponent,
    ForgotPasswordComponent,
    SelectAuthFactorComponent,
    AcceptAgrementComponent,
    ValidInvitationComponent,
    ValidAccountComponent,
    AccountHeaderComponent,

    AskConnectComponent,
    AskConnectDirective,
    CatchRedirectionDirective

  ],
  exports: [
    AcceptAgrementComponent,
    AskConnectDirective,
    CatchRedirectionDirective,
    AuthDialogComponent,
    AccountHeaderComponent,
  ],
  providers: [
    RoleGuard,
  ]
})
export class AccountModule { }
