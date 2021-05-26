import { SelectComponent } from "dist/autoform/lib/models/component/select.component";
import { FormProperty } from "dist/autoform/public-api";
import { IProperty, IPropertyType } from "./iproperty";

export interface UnionProperty extends IProperty {
  select?: SelectComponent;
  types: { [id: string]: FormProperty};
}
