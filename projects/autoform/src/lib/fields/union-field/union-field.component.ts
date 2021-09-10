import {
  Component,
  OnInit,
  AfterViewInit,
  ViewEncapsulation,
} from '@angular/core';

import { FormGroup } from '@angular/forms';
import { IProperty, UnionProperty } from '../../models';
import { BaseFieldComponent, ComponentRegisterService } from '../../service/component-register';
import { AutoFormGroupBuilder } from '../../service/auto-form-group-builder';
import { OnDestroyMixin, untilComponentDestroyed } from 'projects/common/src/public-api';

export interface UnionData {
  type: number;
  [id: string]: any;
}

export class BFC extends BaseFieldComponent<UnionProperty, FormGroup> {}

@Component({
  selector: 'autoform-array-field',
  templateUrl: './union-field.component.html',
  styleUrls: ['./union-field.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class UnionFieldComponent
  extends OnDestroyMixin(BFC)
  implements OnInit, AfterViewInit {

  selectedProperty: IProperty;

  constructor(
    private builder: AutoFormGroupBuilder,
    register: ComponentRegisterService,
  ) {
    super(register);
  }

  ngOnInit(): void {
    if (!this.data.select) {
      this.data.select = { name: 'select', type: 'mat', options: {
        displayContent: (e) => e,
        displayTitle: (e) => e,
        value: Object.keys(this.data.types)
      },};
    }

    this.abstractControl.controls.type.valueChanges
      .pipe(untilComponentDestroyed(this))
      .subscribe((value) => this.onModelSelected(value));
  }

  ngAfterViewInit(): void {
    const currentValue = this.abstractControl.value;

    if (!currentValue) {
    } else {
      this.onModelSelected(currentValue.type, currentValue.data);
    }

  }

  onModelSelected(type: string,  value?: any) {
    if (!type) {
      return;
    }
    this.selectedProperty = this.data.types[type];
    const unionItemForm = this.builder.loopFormProperty(this.selectedProperty);
    this.abstractControl.removeControl('data');
    this.abstractControl.addControl('data', unionItemForm);
    if (value) {
      this.abstractControl.controls.data.patchValue(value);
    }
  }
}
