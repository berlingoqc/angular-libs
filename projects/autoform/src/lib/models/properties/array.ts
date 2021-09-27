import { IProperty, IPropertyType } from './iproperty';

// ArrayProperty
export interface ArrayProperty extends IProperty {

  elementType: IProperty;

  min?: number;
  max?: number;
}
