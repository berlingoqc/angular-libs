import {
    AbstractControlOptions,
    AsyncValidatorFn,
    ValidatorFn,
} from '@angular/forms';
import { TemplateContentData } from '@berlingoqc/ngx-common';
import { Observable } from 'rxjs';
import { PropertyComponent } from '../component';
import { ISubType } from '../subtype';
import { Validator } from './validator';

export type IPropertyType =
    | 'date'
    | 'dic'
    | 'string'
    | 'bool'
    | 'number'
    | 'blob'
    | 'object'
    | 'array';

// IProperty est l'interface de base pour les différents inputs
// contient plusieur sous type pour les implémentation custom
export interface IProperty extends Validator {
    // type de la propriété
    type: IPropertyType;
    // nom de la propriété
    name: string;
    // displayName: Nom de l'affiche si pas utilise name mon gars
    displayName?: TemplateContentData;

    // decorators sont des valeurs supplémentaires qui
    // sont handle par des directive autour de la propriété
    decorators?: { [id: string]: any };

    component?: PropertyComponent;
    // Le sous-type du type.
    subtype?: ISubType;

    // angular material color when applicable
    color?: string;

    // Section des validators qui sont ajoutés manuellement.
    // Sinon des valeurs ici peuvent être aussi fournis via les sous
    // types qui inject des validators
    required?: boolean;
    disabled?: boolean;
    // Message a afficher pour les différentes clé d'erreurs
    errors?: FieldErrors;

    configChange?: Observable<any>;
}

export interface FieldErrors {
    [id: string]: FieldError;
}

export interface FieldError {
    text: string;
}
