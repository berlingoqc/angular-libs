import { Injectable } from "@angular/core";
import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
} from "@angular/forms";
import { SSOSettingsService } from '../../sso/service/sso.service';
import { PasswordConfig } from '@berlingoqc/ngx-common';

@Injectable()
export class PasswordValidatorService {
  get config(): PasswordConfig {
    return this.ssoSettings.settings?.password;
  }

  constructor(public ssoSettings: SSOSettingsService) { }

  getLengthValidators(): any[] {
    return [
      Validators.minLength(this.config?.min),
      Validators.maxLength(this.config?.max),
    ];
  }

  getSimilarValidator(max: number) {
    return [
      (control: AbstractControl) => {
        const value = control.value;
        let n = 0;
        let previous = '';
        for (const v of value) {
          if (previous === v) {
            n += 1;
          } else {
            n = 0;
          }

          if (n === max) {
            return {
              similar: true
            };
          }

          previous = v;
        }
        return {};
      }
    ]
  }

  getCaseValidator() {
    if (this.config?.upperLetter) {
      return [
        (control: AbstractControl) => {
          const value = control.value;
          let rep = {};
          if (!value.match(/[A-Z\s]+/)) {
            rep["noUpperCase"] = true;
          }
          if (!value.match(/[a-z\s]+/)) {
            rep["noLowerCase"] = true;
          }
          return rep;
        },
      ];
    }
    return [];
  }

  getSymbolValidator() {
    if (this.config?.symbol) {
      return [
        (control: AbstractControl) => {
          if (!control.value.match(/[!@#$%^&*(),.?":{}|<>]/g)) {
            return { noSymbol: true };
          }
        },
      ];
    }
    return [];
  }

  getEmailValidator(): ValidatorFn[] {
    return [
      Validators.required,
      (control: AbstractControl): ValidationErrors => {
        if (!control.value.match(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)) {
          return { email: true }
        }
        return {};
      }
    ]
  }

  getErrors(control: AbstractControl): string[] {
    let errors = [];
    if (control.errors) {
      if (control.errors.required) {
        errors.push('Mot de passe requis');
      }
      if (control.errors.minlength) {
        errors.push(`Manque ${this.config.min - control.value.length} charactères`)
      }
      if (control.errors.maxlength) {
        errors.push(`${control.value.length - this.config.max} charactères de trop`);
      }
      if (control.errors.similar) {
        errors.push('Plus de trois fois de suite le même charatêres');
      }
      if (control.errors.noSymbol) {
        errors.push('Pas de symbol ! @ # $ % ^ & * ( ) , . ? " : { } | < >');
      }
      if (control.errors.noLowerCase) {
        errors.push("Pas de lettre minuscule");
      }
      if (control.errors.noUpperCase) {
        errors.push("Pas de lettre majuscule");
      }
    }
    return errors.splice(0, 2);
  }

  getConfirmationError(control: AbstractControl): string[] {
    let errors = [];
    if (control.errors.mustMatch) {
      errors.push("Mot de passe de correspond pas");
    }
    return errors;
  }

  getPasswordFormGroup(): FormGroup {
    return new FormGroup({
      password: this.getPasswordFormControl(''),
      confirmPassword: new FormControl('', [Validators.required])
    }, {
      validators: this.getMatchingPasswordFormControl('password', 'confirmPassword')
    })
  }

  getPasswordFormControl(value: string) {
    return new FormControl(value, [Validators.required, ...this.getLengthValidators(), ...this.getCaseValidator(), ...this.getSymbolValidator(), ...this.getSimilarValidator(3)]);
  }

  getMatchingPasswordFormControl(
    controlName: string,
    matchingControlName: string
  ): ((control: AbstractControl) => any)[] {
    return [
      (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];

        if (!control || !matchingControl) {
          return;
        }

        if (matchingControl.errors && !matchingControl.errors.mustMatch) {
          return;
        }

        if (control.value !== matchingControl.value) {
          matchingControl.setErrors({ mustMatch: true });
        } else {
          matchingControl.setErrors(null);
        }
      },
    ];
  }
}
