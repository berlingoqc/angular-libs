import { Injectable, InjectionToken } from '@angular/core';
import { AutoFormData } from './form';
import { FormObject } from './object';

// Contient la liste de models enregistrer dans le
// context, les models qui utilisent le decorateur
// sont ajouté ici
export type RegisterModels = { [id: string]: FormObject[] };

// Contient la liste de formulaires enregistrés
export type RegisterForms = { [id: string]: AutoFormData };

// AutoFormCallback est l'interface de callback d'un formulaire
export class AutoFormCallback {
  onSubmitValid: (name: string, data: any) => void;
}

export const DEFAULT_AUTO_FORM = new InjectionToken<AutoFormData>('');
