import { TemplateContent } from '@berlingoqc/ngx-common';
import { Container } from './container';
import { IProperty, IPropertyType } from './properties';

// Ensemble des Types de propriétés
export class FormObject implements Container, IProperty {
  type: IPropertyType;
  // Nom de l'objet , utilisé comme nom de clé dans le FormGroup Parent
  name: string;
  // Fonctionnalité additionnel
  decorators?: { [id: string]: any };
  // Ensemble des propriétés de l'object
  properties?: IProperty[];

  templates?: { [id: string]: TemplateContent };

  // Container
  container?: {
    style?: any;
    class?: string[];
  };
}
