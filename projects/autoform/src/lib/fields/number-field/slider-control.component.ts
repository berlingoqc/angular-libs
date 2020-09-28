import { Component, forwardRef, ViewEncapsulation } from '@angular/core';
import { ngValueAccessor } from '../../service/cva';
import { SubTypeComponent } from '../../service/subtypecomponent';
import { NumberProperty } from '../../models/properties/number';

@Component({
  template: `
    <mat-slider
      [color]="property.color"
      [max]="property.max"
      [min]="property.min"
      [step]="property.step"
      [(ngModel)]="model"
      [thumbLabel]="subtype.thumbLabel"
      [displayWith]="format"
    ></mat-slider>
  `,
  selector: 'slider-control',
  providers: [ngValueAccessor(SliderControlComponent)],
  encapsulation: ViewEncapsulation.None,
})
export class SliderControlComponent extends SubTypeComponent<
  NumberProperty,
  any,
  number
> {
  format(d: number) {
    if (this.subtype && this.subtype.formatText) {
      return this.subtype.formatText(d);
    }
    return d;
  }
}
