import { TemplateContent } from "dist/common/public-api";
import { IProperty } from "./iproperty";


export interface DictionnayProperty extends IProperty {
  spacer?: TemplateContent;
  availableProperty?: IProperty[];
  availableType?: IProperty[];
}
