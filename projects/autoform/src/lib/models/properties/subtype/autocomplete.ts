import {
  AbstractControl,
  AsyncValidatorFn,
  FormControl,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import { ISubType, SubTypeHandler } from '../..';
import {
  DataResolver,
  resolveData,
} from '@berlingoqc/ngx-common';
import { BaseFieldComponent } from '../../../service/component-register';
import { FieldErrors } from '../iproperty';

export interface AutocompleteSubType extends ISubType {
  // Si le premier element doit être en focus lors de l'ouverture
  highlightFirst?: boolean;
  // La liste des éléments a afficher
  items: DataResolver<string[]>;
  // Ajout une regle de validation qui empeche d'ajouter un element non présent
  onlyItemPresent?: boolean;
}

export class AutocompleteSubTypeHandler
  implements SubTypeHandler<AutocompleteSubType> {
  getErrors(data: AutocompleteSubType): FieldErrors {
    const fieldErrors: FieldErrors = {};
    if (data.onlyItemPresent) {
      fieldErrors['onlyItemPresent'] = {
        text: 'Seulement les champs affichés sont acceptés',
      };
    }
    return fieldErrors;
  }
  getValidators(
    data: AutocompleteSubType
  ): [ValidatorFn[], AsyncValidatorFn[]] {
    const validators: AsyncValidatorFn[] = [];
    if (data.onlyItemPresent === true) {
      let resolveD: any[];
      validators.push(
        async (abstractControl: AbstractControl): Promise<ValidationErrors> => {
          if (!resolveD) {
            resolveD = await resolveData(data.items).toPromise();
          }
          const value = abstractControl.value;
          if (resolveD.indexOf(value) === -1) {
            return { onlyItemPresent: true };
          }
          return null;
        }
      );
    }
    return [null, validators];
  }

  handle(data: AutocompleteSubType, component: BaseFieldComponent<any, any>) {}
}
