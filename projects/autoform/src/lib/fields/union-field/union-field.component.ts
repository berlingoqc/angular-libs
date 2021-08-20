import {
  Component,
  OnInit,
  ComponentFactoryResolver,
  Injector,
  AfterViewInit,
  ViewEncapsulation,
} from '@angular/core';

import { FormGroup } from '@angular/forms';
import { InjectorBaseFieldComponent } from '../injector-base.component';
import { ArrayProperty, UnionProperty, IProperty } from '../../models';
import { ComponentRegisterService } from '../../service/component-register';
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
  extends InjectorBaseFieldComponent<UnionProperty, FormGroup>
  implements OnInit, AfterViewInit {

  sub: Subscription;

  subFirstSetValue: Subscription;

  constructor(
    private builder: AutoFormGroupBuilder,
    register: ComponentRegisterService,
    componentFactoryResolver: ComponentFactoryResolver,
    injector: Injector
  ) {
    super(register, componentFactoryResolver, injector);
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
    this.templates.get(0).clear();
    const unionItemForm = this.builder.loopFormProperty(this.data.types[type]);
    this.abstractControl.removeControl('data');
    this.abstractControl.addControl('data', unionItemForm);
    if (value) {
      this.abstractControl.controls.data.patchValue(value);
    }
    this.renderFieldInTemplate(this.data.types[type], this.templates.get(0), 0, unionItemForm);
  }

  getAbstractControl(property: IProperty, i: number) {
    return this.abstractControl;
  }

  getTemplateField(): IProperty {
    return this.data;
  }
}
