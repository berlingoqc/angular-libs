import { IProperty } from "./iproperty";


export interface DictionnayProperty extends IProperty {
  availableProperty?: IProperty[];
  availableType?: IProperty[];
}
