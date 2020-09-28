import {
  TemplateContent,
  TemplateContentData,
} from '../../helper/template-content';
import { IProperty } from './iproperty';

// InterfacePour les propirétés dans input
export interface Input {
  maxLength?: number;
  size?: number;
  'aria-label'?: string;
  max?: number;
  min?: number;
}

// InputProperty est la classe de base pour les inputs qui utilisées
// des mat-form-field pour exposer leurs propritétés
export interface InputProperty extends IProperty, Input {
  // Placeholder
  placeholder?: string;
  // Hide required marker
  hideRequired?: boolean;
  // Float Label
  floatLabel?: 'auto' | 'always';
  // Couleur d'angular material utilisé
  color?: string;
  // Apparrence d'angular material
  appearance?: string;
  // Hint afficher sous
  hint?: TemplateContentData;
  hintAlign?: 'end' | 'start';
  // ???? si on a max
  maxlength?: number;
  // Prefix
  preffix?: TemplateContentData;
  // Suffix
  suffix?: TemplateContentData;
}
