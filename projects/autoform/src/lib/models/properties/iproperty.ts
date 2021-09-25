import {
  AbstractControl,
    AbstractControlOptions,
    AsyncValidatorFn,
    FormControl,
    ValidatorFn,
} from '@angular/forms';
import { TemplateContent, TemplateContentData } from '@berlingoqc/ngx-common';
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
    | 'union'
    | 'object'
    | 'abstractobject'
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

    templates?: { [id: string]: TemplateContent };

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

    // callback call when formControl value change
    valuesChanges?: (control: AbstractControl, value: any) => void;
    initialize?: (control: AbstractControl) => void;

    // default value for the formControl
    value?: any;
}

export interface FieldErrors {
    [id: string]: FieldError;
}

export interface FieldError {
    text: string;
}
