import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UntypedFormControl, Form } from '@angular/forms';

export interface Error<T> {
  code: number;
  data?: T;
}

export enum UserServiceError {
  INVALID_EMAIL = 0,
  INVALID_PASSWORD = 1,
  NO_CREDENTIALS = 2,
  NOT_VALIDATE_EMAIL = 3,
  ALREADY_VALIDATE = 4,
  BLOCKED_ACCOUNT = 5,
  EXPIRED_ACCOUNT = 6,
  EXPIRED_PASSWORD = 7,

  EMAIL_ALREADY_EXISTS = 8,
}

@Component({
  selector: 'alb-auth-service-error',
  templateUrl: './auth-service-error.component.html',
  styleUrls: ['./auth-service-error.component.scss'],
})
export class AuthServiceErrorComponent implements OnInit {
  exceptionRequest: string;

  @Input() emailControl: UntypedFormControl;
  @Input() passwordControl: UntypedFormControl;
  @Input() otpControl: UntypedFormControl;

  @Output() errorCode = new EventEmitter<Error<any>>();

  constructor() {}

  ngOnInit(): void {}

  onError(ex) {
    console.log('ERROR FUNCTION');
    if (ex.status === 500) {
      console.log('UNEXPCETED ERRRO');
    }
    let error: Error<any>;
    try {
      error = JSON.parse(ex.error.error.message);
    } catch (_) {
      this.exceptionRequest = 'Erreur lors de la requête';
      return;
    }
    this.errorCode.next(error);
    switch (error.code as UserServiceError) {
      case UserServiceError.INVALID_EMAIL:
        if (this.emailControl) {
          this.emailControl.setErrors({ login: false });
        }
        break;
      case UserServiceError.INVALID_PASSWORD:
        if (this.passwordControl) {
          this.passwordControl.setErrors({ login: false });
        }
        this.exceptionRequest = 'Mot de passe invalide';
        break;
      case UserServiceError.EXPIRED_ACCOUNT:
        this.exceptionRequest = 'Votre compte est expirée';
        break;
      case UserServiceError.BLOCKED_ACCOUNT:
        this.exceptionRequest = 'Votre compte est bloquer';
        break;
      case UserServiceError.ALREADY_VALIDATE:
        this.exceptionRequest = 'Votre compte est deja valider';
      case UserServiceError.EXPIRED_PASSWORD:
        break;
      case UserServiceError.NOT_VALIDATE_EMAIL:
        this.exceptionRequest = "Vous n'avez pas encore validé votre compte";
        break;
      case UserServiceError.EMAIL_ALREADY_EXISTS:
        this.exceptionRequest = 'email déjà existant';
        if (this.emailControl) {
          this.emailControl.setErrors({
            notUnique: true,
          });
        }
        break;
      default:
        break;
    }
  }

  onErrorFunc() {
    return (ex) => this.onError(ex);
  }
}
