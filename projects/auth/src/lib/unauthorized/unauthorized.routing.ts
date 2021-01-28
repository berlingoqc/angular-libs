import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { UnauthorizedComponent } from './component/unauthorized/unauthorized.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: ':id',
        component: UnauthorizedComponent,
      },
    ]),
  ],
})
export class UnauthorizedRoutingModule {}
