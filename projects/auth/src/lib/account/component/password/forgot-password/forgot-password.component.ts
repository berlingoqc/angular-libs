import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ViewChild,
} from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PasswordValidatorService } from '@berlingoqc/ngx-common';

import { AuthSettingConfig } from '../../../../auth/model/auth-setting-config';

import { AuthService } from '../../../../auth/service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'alb-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss',  '../../../../common/shared.scss'],
})
export class ForgotPasswordComponent implements OnInit {

  inputMode: string = 'password';

  forgotPasswordFormGroup = new UntypedFormGroup({
    email: new UntypedFormControl('', [Validators.required]),
  });

  factorFormGroup = new UntypedFormGroup({
    factor: new UntypedFormControl('', [Validators.required]),
  });

  factorDataGroup = new UntypedFormGroup({
    data: new UntypedFormControl('', [Validators.required]),
  });

  tokenFormGroup: UntypedFormGroup;

  typeData = '';
  placeholderData = '';

  error: string;

  currentSubscription: Subscription = null;

  constructor(
    public config: AuthSettingConfig,
    private passwordService: PasswordValidatorService,
    private snapbar: MatSnackBar,
    private authService: AuthService,
    private router: Router,
  ) {
    this.forgotPasswordFormGroup = new UntypedFormGroup({
      email: new UntypedFormControl('', this.passwordService.getEmailValidator()),
    });
    this.tokenFormGroup = new UntypedFormGroup({
      otp: new UntypedFormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(6),
      ]),
      password: this.passwordService.getPasswordFormGroup(),
    });
  }

  ngOnInit(): void { }

  setTypeData() {
    const v = this.factorFormGroup.controls.factor.value;
    this.authService
      .resetCredential({
        email: this.forgotPasswordFormGroup.controls.email.value,
        factor: v,
      })
      .subscribe((x) => { });
    switch (this.factorFormGroup.controls.factor.value) {
      case 'textsms':
        this.typeData = 'tel';
        this.placeholderData = 'Numéro de téléphone';
        this.factorDataGroup.controls.data = new UntypedFormControl('', [
          Validators.required,
        ]);
        break;
      case 'email':
        this.typeData = 'email';
        this.placeholderData = 'Émail';
        // this.factorDataGroup.controls.data = new FormControl('',[Validators.required,Validators.email]);
        break;
      default:
        break;
    }
  }

  getStyleHint() {
    if (!this.tokenFormGroup.controls.otp.valid) {
      return {
        color: 'red',
      };
    }
    return {};
  }

  submitNewPassword() {
    const email = this.forgotPasswordFormGroup.value.email;
    const value = this.tokenFormGroup.value;
    this.currentSubscription = this.authService
      .validOTPResetCredential({
        new: value.password.password,
        otp: '' + value.otp,
        email,
      })
      .subscribe(
        () => {
          this.currentSubscription.unsubscribe();
          this.currentSubscription = null;
          this.router.navigate(['/auth']);
          this.snapbar.open('Mot de passe modifié!', 'fermer', {
            duration: 3000,
          });
        },
        (err) => {
          this.error =
            'Erreur lors de la requête, valeur invalide, code invalide';
          console.log(this.error);
        }
      );
  }

  onQuit() {
    if (this.currentSubscription) {
      this.currentSubscription.unsubscribe();
      this.currentSubscription = null;
    }
    this.router.navigate(['/auth']);
  }
}
