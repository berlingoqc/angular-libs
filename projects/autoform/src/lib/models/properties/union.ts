import { IProperty, IPropertyType } from "./iproperty";

export interface UnionProperty extends IProperty {
  types: IPropertyType[];
}
