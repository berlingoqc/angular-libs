import { Button } from "@berlingoqc/ngx-common";
import { Container } from "../../models";

/**
 * FormActions is the structure to defined
 * the actions button available on a form,
 */
export interface FormActions extends Container {
  submit?: Button;
  cancel?: Button;
  reset?: Button;
  extra?: Button[];
}
