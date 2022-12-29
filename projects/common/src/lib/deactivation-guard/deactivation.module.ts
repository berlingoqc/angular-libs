import { NgModule, InjectionToken } from '@angular/core';
import {
  PendingChangesGuard,
  ActiveChangeComponent,
  PENDING_CHANGE_COMPONENT,
} from './deactivation.guard';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';

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
