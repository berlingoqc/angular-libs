import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UnauthorizedComponent } from './component/unauthorized/unauthorized.component';
import { UnauthorizedConfig } from './model/config';
import { UnauthorizedRoutingModule } from './unauthorized.routing';
import { RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorInterceptor } from './service/http-interceptor';

@NgModule({
  declarations: [UnauthorizedComponent],
  imports: [CommonModule, UnauthorizedRoutingModule, RouterModule],
  exports: [UnauthorizedComponent],
})
export class UnauthorizedModule {
  public static forRoot(
    config: UnauthorizedConfig
  ): ModuleWithProviders<UnauthorizedModule> {
    return {
      ngModule: UnauthorizedModule,
      providers: [
        { provide: UnauthorizedConfig, useValue: config },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
      ],
    };
  }
}
