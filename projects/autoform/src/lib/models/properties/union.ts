import { SelectComponent } from "../component/select.component";
import { FormProperty } from "../object";
import { IProperty, IPropertyType } from "./iproperty";

export interface UnionProperty extends IProperty {
  select?: SelectComponent;
  types: { [id: string]: FormProperty};
}
