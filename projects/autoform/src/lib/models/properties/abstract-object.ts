import { FormObject } from '../object';
import { IProperty } from './iproperty';


/**
 * if required a child must be present
 */
export interface FormAbstractObject extends IProperty {

  // default 'type'
  typeKey?: string;

  // Properties of the parent class that are shared by all child
  properties: IProperty[];
  // Possibility of childs to select to add more form
  childs: FormObject[];
}
