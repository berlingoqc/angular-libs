import { TemplateContent } from 'dist/common/public-api';
import { Container } from './container';
import { IProperty, IPropertyType } from './properties';

// Ensemble des Types de propriétés
export type FormProperty = IProperty | FormObject;

export class FormObject implements Container {
  type: IPropertyType;
  // Nom de l'objet , utilisé comme nom de clé dans le FormGroup Parent
  name: string;
  // Fonctionnalité additionnel
  decorators?: { [id: string]: any };
  // Ensemble des propriétés de l'object
  properties?: FormProperty[];

  templates?: { [id: string]: TemplateContent };


  // Container
  container?: {
    style?: any;
    class?: string[];
  };
}
