import {
  Component,
  Inject,
  Optional,
  ViewEncapsulation,
  EventEmitter,
  Output,
  ViewChild,
} from '@angular/core';
import { MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA, MatLegacyDialogRef as MatDialogRef } from '@angular/material/legacy-dialog';
import { AuthService } from '../../../auth/service/auth.service';
import { UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { SSOSettingsService } from '../../../sso/service/sso.service';
import { AuthDialogConfig } from '../../../auth/model/auth-dialog-config';
import { AuthSettingConfig } from '../../../auth/model/auth-setting-config';
import { AuthServiceErrorComponent } from '../../../common/component/auth-service-error/auth-service-error.component';

type DialogMode = 'login' | 'fpwd' | 'femail' | 'new';

@Component({
  selector: 'alb-auth-dialog',
  templateUrl: './auth-dialog.component.html',
  styleUrls: ['./auth-dialog.component.scss', '../../../common/shared.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [],
})
export class AuthDialogComponent {
  @ViewChild(AuthServiceErrorComponent)
  errorComponent: AuthServiceErrorComponent;

  @Output() connected = new EventEmitter<void>();

  mode: DialogMode = 'login';

  config: AuthDialogConfig;

  exceptionRequest = '';

  closeOnCancel = false;

  loginFormGroup = new UntypedFormGroup({
    email: new UntypedFormControl('', Validators.required),
    password: new UntypedFormControl('', Validators.required),
  });

  constructor(
    @Optional() config: AuthSettingConfig,
    @Optional() @Inject(MAT_DIALOG_DATA) configDialog: any,
    @Optional() private dialogRef: MatDialogRef<AuthDialogComponent>,
    public ssoSettings: SSOSettingsService,
    private authService: AuthService
  ) {
    console.log('SERGIE', config);
    this.config = config.config;
    this.mode = configDialog?.mode ?? 'login';
    if (this.mode !== 'login') {
      this.closeOnCancel = true;
    }
  }

  setLoginMode() {}

  setForgetPasswordMode() {}

  setForgotEmailMode() {}

  login() {
    this.submitLogin().subscribe(() => {});
  }

  submitLogin(): Observable<void> {
    return new Observable((obs) => {
      if (this.loginFormGroup.valid) {
        const request = {
          email: this.loginFormGroup.value.email,
          password: this.loginFormGroup.value.password,
        };
        (async () => {
          try {
            await this.authService.login(request);
            if (this.dialogRef) {
              this.dialogRef.close({
                login: true,
              });
            }
            this.connected.emit();
            obs.complete();
          } catch (ex) {
            this.errorComponent.onError(ex);
            obs.error(ex);
          }
        })();
      } else {
        obs.error('form not valid');
        console.log('form is not valid');
      }
    });
  }

  onCancel(mode: DialogMode) {
    if (this.closeOnCancel || this.mode == 'new') {
      this.dialogRef.close();
    } else {
      this.mode = mode;
    }
  }
}
