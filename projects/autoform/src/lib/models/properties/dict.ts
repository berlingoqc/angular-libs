import { TemplateContent } from "@berlingoqc/ngx-common";
import { IProperty } from "./iproperty";


export interface DictionnayProperty extends IProperty {
  spacer?: TemplateContent;
  availableProperty?: IProperty[];
  availableType?: IProperty[];
}
