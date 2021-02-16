import {
    DynamicStyleRegisterService,
  envConfig,
  EnvConfigurationService,
    PasswordValidatorService,
} from '@berlingoqc/ngx-common';
import { NotificationModule } from '@berlingoqc/ngx-pwa';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { APP_INITIALIZER, ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgxPermissionsModule } from 'ngx-permissions';
import { Actions } from '../account/model/redirect-action.config';
import { AuthService } from './service/auth.service';
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
    declarations: [],
    imports: [NotificationModule, RouterModule, NgxPermissionsModule.forRoot()],
    exports: [NgxPermissionsModule],
})
export class AuthModule {
    public static forRoot(): ModuleWithProviders<AuthModule> {
        return {
            ngModule: AuthModule,
            providers: [
                {
                    provide: HTTP_INTERCEPTORS,
                    useClass: AuthInterceptor,
                    multi: true,
                },
                AuthSettingConfig,
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
        private authDialog: AuthDialogService,
    ) {
        this.authDialog.inviteUserComponent = InviteUserDialogComponent;
    }
}

export const loadSSOConfig = (configData: any) => (
    config: AuthSettingConfig,
    authService: AuthService,
    authSettings: SSOSettingsService,
    passwordValidator: PasswordValidatorService,
    envService: EnvConfigurationService,
) => {
    return () => {
        return new Promise<void>(async (resol) => {
            for(const [k,v] of Object.entries(configData)) {
              config[k] = v;
            }

            const c = await envService.load().toPromise();
            config.backend = {url: c.sso};

            authService
                .info()
                .toPromise()
                .then((info) => {
                    authSettings.settings = info;
                    passwordValidator.config = info.password;
                    authSettings.settingsUpdate.next(info);
                    resol();
                });
            authService.init();
        });
    };
};

export const AUTH_APP_INITALIZER = (config:any) => ({
    provide: APP_INITIALIZER,
    useFactory: loadSSOConfig(config),
    deps: [
        AuthSettingConfig,
        AuthService,
        SSOSettingsService,
        PasswordValidatorService,
        EnvConfigurationService,
    ],
    multi: true,
});
