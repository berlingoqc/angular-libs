import { Component, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { FormStepControlImpl } from '../../helper/form-ops/form-ops';
import { AutoFormGroupBuilder } from '../../service/auto-form-group-builder';
import { BaseAutoFormComponent } from '../auto-form.base';

export class FormStepControlMatStepper implements FormStepControlImpl {
  constructor(
    private stepper: MatStepper,
    private control: AbstractControl,
    private length: number
  ) {}

  get fistPage() {
    return this.stepper.selectedIndex === 0;
  }

  get lastPage() {
    return this.stepper.selectedIndex + 1 === this.length;
  }

  next() {
    if (!this.control.valid) {
      this.control.markAllAsTouched();
      return;
    }
    this.stepper.next();
  }

  previous() {
    this.stepper.previous();
  }

  reset() {
    this.stepper.reset();
  }
}

@Component({
  selector: 'lib-auto-form-stepper',
  templateUrl: './auto-form-stepper.component.html',
  styleUrls: ['./auto-form-stepper.component.scss'],
})
export class AutoFormStepperComponent extends BaseAutoFormComponent {
  contolType = FormStepControlMatStepper;
}
