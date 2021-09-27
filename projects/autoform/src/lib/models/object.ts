import { TemplateContent } from '@berlingoqc/ngx-common';
import { Container } from './container';
import { IProperty, IPropertyType } from './properties';

// Ensemble des Types de propriétés
export interface FormObject extends Container, IProperty {
    // Ensemble des propriétés de l'object
    properties?: IProperty[];

    // if optional the object is not render
    // and the value is undefined in the form
    // instead a button is present and you
    // can delete afterward the element.
    optional?: boolean;

    // Container
    container?: {
        style?: any;
        class?: string[];
    };
}
