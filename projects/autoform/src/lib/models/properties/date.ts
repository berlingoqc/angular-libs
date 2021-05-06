import { DataResolver } from "dist/common/public-api";
import { InputProperty } from "./input";


// Model return on the formControl when DateProperty is
// on range=true
export interface DateRange {
  start: Date;
  end: Date;
}

export interface DateProperty extends InputProperty {

  // view to start year , month , ...
  startView: string;

  // custom icon to open the date dialog
  customIcon?: string;
  // actions icons
  // TODO
}
