import { MatHorizontalStepper } from '@angular/material/stepper';
import { FormStepConfig } from '../../helper/form-ops/form-ops';

export interface AutoFormStepperConfig extends FormStepConfig {
  // Default horizontal
  direction?: 'vertical' | 'horizontal';
  linear?: boolean;
  labelPosition?: MatHorizontalStepper['labelPosition'];
}
