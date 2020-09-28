import { ComponentType } from '@angular/cdk/portal';
import { Type } from '@angular/core';
import { IPropertyType } from './properties';

// IPropertyComponentHandler est un handler pour venir
// register une component de base qui fait la gestion
// d'un type.
// Elle posséde différent type de typeComponent qui
// permettend d'afficher les données et d'appliquer
// les modifiactions d'un subType
export interface IPropertyComponentHandler {
  type: IPropertyType;
  mainComponentType: Type<any>;

  typeComponentHandler: TypeComponentHandler[];
}

// Définition d'un TypeComponent qui est la component
// pour faire la représentation des données
// pour une liste de subtype
export interface TypeComponentHandler {
  type: string | Type<any>;
  acceptedSubType: string[];
}

export function getIPropertyAllowedSubType(
  i: IPropertyComponentHandler
): string[] {
  return [];
}
