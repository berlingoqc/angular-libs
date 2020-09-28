import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { TopbarComponent } from './component/topbar.component';


@NgModule({
  imports: [
    CommonModule,
    MatToolbarModule
  ],
  declarations: [
    TopbarComponent
  ],
  exports: [
    TopbarComponent
  ]
})
export class LayoutExtraModule { }