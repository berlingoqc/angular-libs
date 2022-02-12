import { NgModule } from '@angular/core';
import { ActionConfirmationDialogComponent } from './action-confirmation-dialog/action-confirmation-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { ActionConfirmationService } from './action-confirmation.service';
import { MatDialogModule } from '@angular/material/dialog';



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
