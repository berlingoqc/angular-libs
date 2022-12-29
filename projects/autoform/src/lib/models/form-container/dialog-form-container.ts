import { MatLegacyDialogConfig as MatDialogConfig } from "@angular/material/legacy-dialog";
import { BaseFormContainer } from "./form-container";

export class DialogFormContainer
  extends MatDialogConfig<any>
  implements BaseFormContainer {
}
