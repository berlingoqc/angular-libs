import { AfterViewInit, Component, Input } from '@angular/core';
import { FormStepControlImpl } from '../form-ops';

@Component({
  selector: 'autoform-step-controls',
  template: `
    <button mat-button *ngIf="!controls.fistPage" (click)="controls.previous()">
      Back
    </button>
    <button mat-button *ngIf="!controls.lastPage" (click)="controls.next()">
      Next
    </button>
    <button mat-button *ngIf="controls.lastPage">Submit</button>
    <button mat-button *ngIf="controls.reset" (click)="controls.reset()">
      Reset
    </button>
  `,
})
export class StepFormControlsComponent {
  @Input() controls: FormStepControlImpl;
}
