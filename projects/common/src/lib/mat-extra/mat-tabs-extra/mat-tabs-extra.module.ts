import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsRouterSavedDirective } from './mat-tabs-router.directive';



@NgModule({
  declarations: [MatTabsRouterSavedDirective],
  imports: [
    CommonModule
  ],
  exports: [MatTabsRouterSavedDirective],
})
export class MatTabsExtraModule { }
