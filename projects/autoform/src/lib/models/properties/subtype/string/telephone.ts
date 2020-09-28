import { ValidatorFn, AsyncValidatorFn } from '@angular/forms';
import { BaseFieldComponent } from 'projects/autoform/src/lib/service/component-register';
import { ISubType, SubTypeHandler } from '../../../subtype';
import { FieldErrors } from '../../iproperty';

export class TeleponeSubType implements ISubType {
  name = 'telephone';
}

export class TelephoneSubTypeHandler
  implements SubTypeHandler<TeleponeSubType> {
  handle(data: TeleponeSubType, component: BaseFieldComponent<any, any>) {
    throw new Error('Method not implemented.');
  }
  getValidators(data: TeleponeSubType): [ValidatorFn[], AsyncValidatorFn[]] {
    throw new Error('Method not implemented.');
  }
  getErrors(data: TeleponeSubType): FieldErrors {
    throw new Error('Method not implemented.');
  }
}
