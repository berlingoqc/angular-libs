import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsRouterDirective } from './mat-tabs-router.directive';



@NgModule({
  declarations: [MatTabsRouterDirective],
  imports: [
    CommonModule
  ],
  exports: [MatTabsRouterDirective],
})
export class MatTabsExtraModule { }
