import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TestMultiPartMatInputComponent } from './autoform/test-multi-part-mat-input.component';
import { DemoAutoTableComponent } from './autotable/demo-auto-table.component';

const routes: Routes = [
    {
        path: 'autoform',
        loadChildren: () =>
            import('./autoform/wrapper').then(
                (x) => x.AutoFormRegisterWrapperModule,
            ),
    },
    {
        path: 'test-multipart',
        component: TestMultiPartMatInputComponent,
    },
    {
        path: 'test-autotable',
        component: DemoAutoTableComponent,
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
    exports: [RouterModule],
})
export class AppRoutingModule {}
