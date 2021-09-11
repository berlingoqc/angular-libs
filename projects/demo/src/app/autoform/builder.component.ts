import { Component } from "@angular/core";
import { AutoFormData } from "projects/autoform/src/public-api";
import { autoFormFormData } from "projects/demo/src/app/autoform/models/auto-form.form";





@Component({
  selector: '',
  template: `<autoform-form [formData]="data"></autoform-form>`
})
export class BuilderComponent {
  data: AutoFormData = autoFormFormData;
}
