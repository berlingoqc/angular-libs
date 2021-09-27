import { SelectComponent } from "../component/select.component";
import { IProperty } from "./iproperty";

export interface UnionProperty extends IProperty {
  select?: SelectComponent;
  types: { [id: string]: IProperty};
}
