import { UntypedFormGroup } from "@angular/forms";
import { DataResolver } from "@berlingoqc/ngx-common";

export interface AutoFormEvent {
  // Call on submitting the form, if failed stop the flow
  submit: DataResolver<any>,
  initialData?: DataResolver<any>,

  afterFormCreated?: (form: UntypedFormGroup) => void;
}
