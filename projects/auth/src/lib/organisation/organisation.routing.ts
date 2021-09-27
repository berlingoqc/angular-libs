import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuard } from '../auth/guard';
import { OrganisationDashboardComponent, OrganisationManagerDashboardComponent } from './component';
import { OrganisationModule } from './organisation.module';

@NgModule({
  imports: [
    OrganisationModule,
    RouterModule.forChild([
      {
        path: '',
        component: OrganisationDashboardComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'manage/:orgId',
        component: OrganisationManagerDashboardComponent,
        canActivate: [AuthGuard],
      },
    ]),
  ],
  exports: [RouterModule],
})
export class OrganisationRouting { }
