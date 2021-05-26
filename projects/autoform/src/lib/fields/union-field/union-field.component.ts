import {
  Component,
  OnInit,
  ComponentFactoryResolver,
  Injector,
  AfterViewInit,
  ViewEncapsulation,
} from '@angular/core';

import { AbstractControl, FormArray, FormControl, FormGroup } from '@angular/forms';
import { InjectorBaseFieldComponent } from '../injector-base.component';
import { FormProperty } from '../../models/object';
import { take } from 'rxjs/operators';
import { ArrayProperty, UnionProperty } from '../../models';
import { ComponentRegisterService } from '../../service/component-register';
import { AutoFormGroupBuilder } from '../../service/auto-form-group-builder';
import { unsubscriber } from '@berlingoqc/ngx-common';
import { Subscription } from 'rxjs';

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


  selectFormControl = new FormControl();

  unionForm: AbstractControl;

  sub: Subscription;

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
      this.data.select = { name: 'select', type: 'mat', options: {}};
    }
    this.data.select.options.displayContent = (item) => item[0];
    this.data.select.options.options = {
      value: Object.entries(this.data.types),
    };

    this.sub = this.selectFormControl.valueChanges
      .subscribe((value) => this.onModelSelected(value));
  }

  ngAfterViewInit(): void {
  }

  onModelSelected(value: any) {
    this.templates.get(0).clear();
    this.unionForm = this.builder.loopFormProperty(value[1]);
    this.initContextData(value[1], this.templates.get(0), 0);
    // THIS CODE WILL BREAK IF UNION IS IN ARRAY LOL
    (this.abstractControl.parent as FormGroup).removeControl(this.data.name);
    (this.abstractControl.parent as FormGroup).addControl(this.data.name, this.unionForm);
  }

  getAbstractControl(property: FormProperty, i: number) {
    return this.unionForm;
  }

  getTemplateField(): FormProperty {
    return this.data;
  }
}
