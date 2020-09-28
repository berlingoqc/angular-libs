import {
  ValidatorFn,
  AbstractControlOptions,
  AsyncValidatorFn,
} from '@angular/forms';
import { BaseFieldComponent } from '../service/component-register';
import { FieldErrors } from './properties';

// Interface de base pour les sous types.
// Un sous-type, contient des attouts additionel que la PropertyComponent
// utilise pour ce configurer et appliquer des regles de validations
export interface ISubType {
  name: string;
}

// Handler est implémenter pour handler l'application du sub type sur l'input
export interface SubTypeHandler<T extends ISubType> {
  // Retourne la liste des generateurs disponible
  // et un object avec la liste des paramèters
  getGeneratorsInfo?: { [id: string]: string };
  // Appeler avant OnInit pour faire des initializiation
  // sur le FieldComponent pour qu'il se configure pour
  // le subType
  handle(data: T, component: BaseFieldComponent<any, any>);
  // Appelé lors de la création du form pour venir
  // obtenir la liste des validators a retourner
  getValidators(data: T): [ValidatorFn[], AsyncValidatorFn[]];
  // Appellé lors de la génération pour obtenir la liste
  // des erreurs qui seront ajoutés
  getErrors(data: T): FieldErrors;
}
