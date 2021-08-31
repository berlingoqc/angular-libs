import {
  Component,
  OnInit,
  AfterViewInit,
  ViewEncapsulation,
} from '@angular/core';
import {
  FormGroup,
} from '@angular/forms';
import { FormObject } from '../../models/object';
import { BaseFieldComponent } from '../../service/component-register';

@Component({
  selector: 'autoform-object-field',
  templateUrl: './object-field.component.html',
  styleUrls: ['./object-field.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ObjectFieldComponent
  extends BaseFieldComponent<FormObject, FormGroup> {
}
