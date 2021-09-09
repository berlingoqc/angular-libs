import {
  Component,
  OnInit,
  AfterViewInit,
  ViewEncapsulation,
} from '@angular/core';

import { FormArray } from '@angular/forms';
import { ArrayProperty } from '../../models';
import { BaseFieldComponent, ComponentRegisterService } from '../../service/component-register';
import { AutoFormGroupBuilder } from '../../service/auto-form-group-builder';

@Component({
  selector: 'autoform-array-field',
  templateUrl: './array-field.component.html',
  styleUrls: ['./array-field.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ArrayFieldComponent
  extends BaseFieldComponent<ArrayProperty, FormArray>
  implements OnInit, AfterViewInit {

  staticSize: boolean;
  canAdd: boolean;
  canDelete: boolean;

  private getCanAdd(): boolean {
    if (this.data.max && this.data.max <= this.abstractControl.controls.length) {
      return false;
    }
    return true;
  }

  private getCanDelete(): boolean {
    if (this.data.min >= this.abstractControl.controls.length) return false;
    return true;
  }

  constructor(
    private builder: AutoFormGroupBuilder,
    register: ComponentRegisterService,
  ) {
    super(register);
  }

  ngOnInit(): void {
    this.staticSize = this.data.max && this.data.max === this.data.min;
    this.setState();
  }

  ngAfterViewInit() {}

  addControl() {
    const abstractControl = this.builder.loopFormProperty(this.data.elementType);
    this.abstractControl.controls.push(abstractControl);
    this.setState();
  }

  trackBy(index: number, name: any): number {
    return name;
  }

  removeControl(index: number) {
    this.abstractControl.controls.splice(index, 1);
    this.setState();
  }

  moveBefore() {}

  moveAfter() {}

  private setState() {
    this.canAdd = this.getCanAdd();
    this.canDelete = this.getCanDelete();
  }
}
