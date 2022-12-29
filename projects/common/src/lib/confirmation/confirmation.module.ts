import { NgModule } from '@angular/core';
import { ActionConfirmationDialogComponent } from './action-confirmation-dialog/action-confirmation-dialog.component';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { ActionConfirmationService } from './action-confirmation.service';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';



@NgModule({
    imports: [
        MatButtonModule,
        MatDialogModule,
    ],
    declarations: [
        ActionConfirmationDialogComponent
    ],
    exports: [],
    providers: [
      ActionConfirmationService,
    ]
})
export class ConfirmationModule {

}
