import { FormControl, Validators, ValidatorFn } from '@angular/forms';
import { ISubType } from '..';
import { BaseFieldComponent } from '../../service/component-register';
import { SubTypeHandler } from '../subtype';
import { InputProperty } from './input';

export interface StringProperty extends InputProperty {
  maxlength?: number;
  placeholder?: string;
}

export interface EmailSubType extends ISubType {}

/*
export class EmailSubTypeHandler implements SubTypeHandler {
  handle(component: BaseFieldComponent<StringProperty, FormControl>) {
    if (component instanceof BaseFieldComponent) {
      if (!component.data.errors.pattern) {
        component.data.errors.pattern = {
          text: 'Email invalide',
        };
      }
    } else {
      console.warn('EMAIL SUB TYPE RECEIVED INVALID CLASS', component);
    }
  }

  getValidators(
    component: BaseFieldComponent<StringProperty, FormControl>
  ): ValidatorFn[] {
    const validators = [];
    validators.push(
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$')
    );
    return validators;
  }
}
*/
