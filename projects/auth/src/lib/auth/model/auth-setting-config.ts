import { ComponentType } from '@angular/cdk/portal';
import { AuthDialogConfig } from './auth-dialog-config';
import { Actions } from '../../account';
import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class AuthSettingConfig {
  component: ComponentType<any>; // component to show for authDialog
  backend: { url: string }; // info of the backend to connect to
  config: AuthDialogConfig; // configuration of the auth dialog

  actions?: Actions;

  navigate?: any;

  usingContract?: {
    text: string;
  }; // if we have an agreement contract when creating an account
}
