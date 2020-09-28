import { NgModule, ModuleWithProviders } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { LangInterceptor } from './lang.interceptor';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [],
  imports: [TranslateModule, HttpClientModule],
  exports: [],
  providers: []
})
export class LangModule {

  public static forRoot(): ModuleWithProviders<LangModule> {
    return {
      ngModule: LangModule,
      providers: [
        { provide: HTTP_INTERCEPTORS, useClass: LangInterceptor, multi: true }
      ]
    };
  }
}
