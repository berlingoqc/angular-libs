import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AdminControlComponent } from './component';
import { AdminModule } from './admin.module';
import { RoleGuard } from '../account';

@NgModule({
  imports: [
    AdminModule,
    RouterModule.forChild([
      {
        path: "",
        canActivate: [RoleGuard],
        component: AdminControlComponent,
        data: {
          roles: ["ADMIN"],
        },
      },
    ]),
  ],
  exports: [],
})
export class AdminRoutingModule { }
