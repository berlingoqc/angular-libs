import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicStyleRegisterService } from './dynamic-style-register.service';
import { DynamicStyleDirective } from './style-provider.directive';





@NgModule({
  imports: [ CommonModule ],
  declarations: [
    DynamicStyleDirective
  ],
  providers: [
    DynamicStyleRegisterService,
  ],
  exports: [ DynamicStyleDirective ]
})
export class DynamicStyleProviderModule {

}
