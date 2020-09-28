import { Component, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { FormStepControlImpl } from '../../helper/form-ops/form-ops';
import { BaseAutoFormComponent } from '../auto-form.base';

export class AutoFormStepControlMatAccordion implements FormStepControlImpl {
  constructor(
    private length: number,
    private index: number,
    private control: AbstractControl,
    private component: AutoFormExpansionPanelComponent
  ) {
    console.log('COMPONENT', component);
  }

  get fistPage() {
    return this.index === 0;
  }

  get lastPage() {
    return this.index + 1 === this.length;
  }

  next() {
    if (!this.control.valid) {
      this.control.markAllAsTouched();
      return;
    }
    this.component.step++;
  }

  previous() {
    this.component.step--;
  }
}

@Component({
  selector: 'lib-auto-form-expansion-panel',
  templateUrl: './auto-form-expansion-panel.component.html',
  styleUrls: ['./auto-form-expansion-panel.component.scss'],
})
export class AutoFormExpansionPanelComponent extends BaseAutoFormComponent {
  controlType = AutoFormStepControlMatAccordion;
  step = 0;
}
