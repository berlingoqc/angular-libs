import {
  DynamicStyleRegisterService,
  PasswordValidatorService
} from '@berlingoqc/ngx-common';
import { NotificationModule } from '@berlingoqc/ngx-pwa';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgxPermissionsModule } from 'ngx-permissions';
import { Actions } from '../account/model/redirect-action.config';
import {
  AuthService,
} from './service/auth.service';
import { NavigateService } from './service/navigate.service';
import { SSOSettingsService } from '../sso/service/sso.service';

import { InvitationService } from './service/invitation.service';
import { RoleAPI } from './service';
import { AuthSettingConfig } from './model/auth-setting-config';
import { AuthInterceptor } from './interceptor/auth.interceptor';
import { UserAPI } from './service/user.api';
import { TokenService } from './service/token.service';
import { AuthDialogService } from './service/auth-dialog.service';
import { AuthGuard } from './guard';
import { InviteUserDialogComponent } from '../invitation';

@NgModule({
  declarations: [
  ],
  imports: [
    NotificationModule,
    RouterModule,
    NgxPermissionsModule.forRoot(),
  ],
  exports: [
    NgxPermissionsModule,
  ],
})
export class AuthModule {
  public static forRoot(
    config: AuthSettingConfig
  ): ModuleWithProviders<AuthModule> {
    return {
      ngModule: AuthModule,
      providers: [
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
        { provide: AuthSettingConfig, useValue: config },
        { provide: Actions, useValue: config.actions ?? {} },
        {
          provide: NavigateService,
          useClass: config.navigate ?? NavigateService,
        },
        InvitationService,
        AuthGuard,
        UserAPI,
        RoleAPI,
        SSOSettingsService,
        AuthDialogService,
        TokenService,
        AuthService,
      ],
    };
  }

  constructor(
    private moduleSettings: AuthSettingConfig,
    private authService: AuthService,
    private authDialog: AuthDialogService,
    private passwordValidatorService: PasswordValidatorService,
    private authSettings: SSOSettingsService,
    private dynamicStyle: DynamicStyleRegisterService
  ) {
    this.authDialog.inviteUserComponent = InviteUserDialogComponent;
    this.authService.info().subscribe((info) => {
      this.authSettings.settings = info;
      this.passwordValidatorService.config = info.password;
      this.authSettings.settingsUpdate.next(info);
    });
    Object.entries(this.moduleSettings.config.itemClass).forEach(([k, v]) => {
      this.dynamicStyle.items[k] = { classList: v };
    });
  }
}
