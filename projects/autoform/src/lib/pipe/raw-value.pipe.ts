import { Pipe, PipeTransform } from "@angular/core";
import { AbstractControl, FormControl, FormGroup } from "@angular/forms";

@Pipe({ name: 'controlRawData', pure: true })
export class ControlRawDataPipe implements PipeTransform {
    transform(control: AbstractControl): any {
      return control['getRawData'] ? control['getRawData']() : control.value;
    }
}
