import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DemoAutoTableComponent } from './autotable/demo-auto-table.component';
import { HomeComponent } from './home.component';

const routes: Routes = [
    {
      path: '',
      component: HomeComponent,
    },
    {
        path: 'autoform',
        loadChildren: () =>
            import('./autoform/wrapper').then(
                (x) => x.AutoFormRegisterWrapperModule,
            ),
    },
    {
        path: 'autotable',
        component: DemoAutoTableComponent,
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
    exports: [RouterModule],
})
export class AppRoutingModule {}
