import { NgModule, ModuleWithProviders } from '@angular/core';
import { PhoneNumberComponent } from './component/phone-number.component';
import { EmailComponent } from './component/email.component';
import { CommonModule } from '@angular/common';
import { ContactConfig } from './model/config';

@NgModule({
  declarations: [PhoneNumberComponent, EmailComponent],
  imports: [CommonModule],
  exports: [PhoneNumberComponent, EmailComponent],
})
export class ContactModule {
  public static forRoot(config: ContactConfig): ModuleWithProviders<ContactModule> {
    return {
      ngModule: ContactModule,
      providers: [{ provide: ContactConfig, useValue: config }],
    };
  }
}
