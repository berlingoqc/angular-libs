import { NgModule } from '@angular/core';
import { AuthServiceErrorComponent } from './component/auth-service-error/auth-service-error.component';
import { CommonModule } from '@angular/common';


@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    AuthServiceErrorComponent
  ],
  exports: [
    AuthServiceErrorComponent
  ],
  entryComponents: []
})
export class AuthCommonModule { }