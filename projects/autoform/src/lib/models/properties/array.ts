import { IProperty, IPropertyType } from './iproperty';

// ArrayProperty
export interface ArrayProperty extends IProperty {
  // Type de l'item dans l'array , pas possible d'avoir array
  // avec plusieurs types
  subitems: IPropertyType;

  // Configuration de la propriétés
  item: IProperty;

  min?: number;
  max?: number;
}
