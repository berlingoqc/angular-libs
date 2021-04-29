import { BaseFormContainer } from "./form-container";


export interface StepperFormContainer extends BaseFormContainer {
  direction: 'vertical' | 'horizontal';
  linear: boolean;
}
