import { NgModule } from '@angular/core';
import { ActionConfirmationDialogComponent } from './action-confirmation-dialog/action-confirmation-dialog.component';
import { DynamicStyleProviderModule } from '../dynamic-style-provider/dynamic-style-provider.modules';



@NgModule({
  imports: [
    DynamicStyleProviderModule
  ],
  declarations: [
    ActionConfirmationDialogComponent
  ],
  exports: [],
  entryComponents: [ActionConfirmationDialogComponent]
})
export class ConfirmationModule {

}