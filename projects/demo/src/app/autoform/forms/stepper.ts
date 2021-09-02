import { AutoFormData } from "projects/autoform/src/public-api";



export const stepperForm: AutoFormData = {
  items: [],
  type: 'stepper',
  actionsButtons: {
    submit: {
      title: 'Submit',
      style: 'mat-stroked-button',
      color: 'primary'
    }
  }
};
