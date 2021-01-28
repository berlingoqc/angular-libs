import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ValidAccountComponent, ValidInvitationComponent } from './component';

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
    ]),
  ],
  exports: [RouterModule],
})
export class AccountRoutingModule { }
