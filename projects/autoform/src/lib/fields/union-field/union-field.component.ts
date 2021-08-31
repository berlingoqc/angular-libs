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
import { unsubscriber } from '@berlingoqc/ngx-common';
import { Subscription } from 'rxjs';

export interface UnionData {
  type: number;
  [id: string]: any;
}

@Component({
  selector: 'autoform-array-field',
  templateUrl: './union-field.component.html',
  styleUrls: ['./union-field.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
@unsubscriber
export class UnionFieldComponent
  extends BaseFieldComponent<UnionProperty, FormGroup>
  implements OnInit, AfterViewInit {

  sub: Subscription;

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
      }, };
    }
    this.data.select.options.displayContent = (e) => e,
    this.data.select.options.displayTitle = (e) => e,
    this.data.select.options.options = {
      value: Object.keys(this.data.types),
    };


    this.sub = this.abstractControl.controls.type.valueChanges
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
