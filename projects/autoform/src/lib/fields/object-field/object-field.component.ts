import {
  Component,
  OnInit,
  AfterViewInit,
  ViewEncapsulation,
} from '@angular/core';
import {
  FormGroup,
} from '@angular/forms';
import { OnDestroyMixin, untilComponentDestroyed, Button } from '@berlingoqc/ngx-common';
import { AutoFormGroup } from '../../helper/form-group/auto-form-group';
import { FormObject } from '../../models/object';
import { BaseFieldComponent } from '../../service/component-register';

class MFR extends BaseFieldComponent<
    FormObject,
    AutoFormGroup
> {}

@Component({
    selector: 'autoform-object-field',
    templateUrl: './object-field.component.html',
    styleUrls: ['./object-field.component.scss'],
    encapsulation: ViewEncapsulation.None,
    inputs: ['data', 'abstractControl']
})
export class ObjectFieldComponent extends OnDestroyMixin(MFR) implements OnInit {

  buttons: Button[] = [];

  ngOnInit(): void {
    /*if (this.data.optional) {
      this.buttons.push({
        title: 'Enable',
        if: () => this.abstractControl.disabled,
        click: () => this.abstractControl.enable()
      }, {
        title: 'Disabled',
        if: () => this.abstractControl.enabled,
        click: () => this.abstractControl.disable()
      })
    }
    */
    this.abstractControl.getActionObservable()
      .pipe(untilComponentDestroyed(this))
      .subscribe(()=> {})
  }

}
