import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CreateUserComponent, ForgotPasswordComponent, ValidAccountComponent, ValidInvitationComponent } from './component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'validate/invitation',
        component: ValidInvitationComponent,
      },
      {
        path: 'validate/account',
        component: ValidAccountComponent,
      },
      {
        path: 'create',
        component: CreateUserComponent,
      },
      {
        path: 'forgot',
        component: ForgotPasswordComponent,
      }
    ]),
  ],
  exports: [RouterModule],
})
export class AccountRoutingModule { }
