import { NgModule, InjectionToken } from '@angular/core';
import {
  PendingChangesGuard,
  ActiveChangeComponent,
  PENDING_CHANGE_COMPONENT,
} from './deactivation.guard';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
    declarations: [ActiveChangeComponent],
    imports: [MatDialogModule, MatButtonModule],
    providers: [
        PendingChangesGuard,
        {
            provide: PENDING_CHANGE_COMPONENT,
            useClass: ActiveChangeComponent,
        },
    ],
    exports: []
})
export class DeactivationModule {}
