import { DataResolver } from "@berlingoqc/ngx-common";

export interface AutoFormEvent {
  // Call on submitting the form, if failed stop the flow
  submit: DataResolver<any>,
  initialData?: DataResolver<any>,
}
