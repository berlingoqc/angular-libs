import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserAccountComponent } from './user-account.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: UserAccountComponent,
      },
    ]),
  ],
  exports: [RouterModule],
})
export class UserAccountRoutingModule { }
