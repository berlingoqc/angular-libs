import { AutoFormData } from "projects/autoform/src/public-api";

export const simpleForm: AutoFormData = {
    items: [],
    type: 'simple',


    actionsButtons: {
      submit: {
        title: 'Submit',
        style: 'mat-flat-button',
        color: 'primary',
      }
    }
};
