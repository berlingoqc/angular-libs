import { NgModule } from '@angular/core';
import { ActionConfirmationDialogComponent } from './action-confirmation-dialog/action-confirmation-dialog.component';
import { MatButtonModule } from '@angular/material/button';



@NgModule({
  imports: [
    MatButtonModule,
  ],
  declarations: [
    ActionConfirmationDialogComponent
  ],
  exports: [],
  entryComponents: [ActionConfirmationDialogComponent]
})
export class ConfirmationModule {

}
