import { AsyncValidatorFn, ValidatorFn } from '@angular/forms';
import { BaseFieldComponent } from '../../../../service/component-register';
import { ISubType, SubTypeHandler } from '../../../subtype';
import { FieldErrors } from '../../iproperty';

export interface EmailSubType extends ISubType {}

export class EmailSubType implements SubTypeHandler<EmailSubType> {
    handle(data: EmailSubType, component: BaseFieldComponent<any, any>) {}
    getValidators(data: EmailSubType): [ValidatorFn[], AsyncValidatorFn[]] {
        return [null, null];
    }
    getErrors(data: EmailSubType): FieldErrors {
        return {};
    }
}
