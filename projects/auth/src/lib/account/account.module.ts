import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { CreateUserComponent } from './component/create-user/create-user.component';
import { AuthDialogComponent } from './component/auth-dialog/auth-dialog.component';
import { ForgotPasswordComponent, SelectAuthFactorComponent, ValidAccountComponent, AcceptAgrementComponent, ValidInvitationComponent } from './component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AuthCommonModule } from '../common';
import { FormExtraModule, DynamicStyleProviderModule } from '@berlingoqc/ngx-common';
import { MatStepperModule } from '@angular/material/stepper';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { UserModule } from '../user';
import { AskConnectDirective, CatchRedirectionDirective, AskConnectComponent } from './directive';
import { RoleGuard } from './guard';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatStepperModule,
    MatExpansionModule,
    MatListModule,
    MatIconModule,
    MatCheckboxModule,

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

    AskConnectComponent,
    AskConnectDirective,
    CatchRedirectionDirective

  ],
  exports: [
    AcceptAgrementComponent,
    AskConnectDirective,
    CatchRedirectionDirective,
    AuthDialogComponent,

  ],
  providers: [
    RoleGuard,
  ]
})
export class AccountModule { }
