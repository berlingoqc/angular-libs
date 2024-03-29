import { AutoFormData } from "projects/autoform/src/public-api";
import { of } from "rxjs";

export const simpleForm: AutoFormData = {
    items: [],
    type: 'simple',


    actionsButtons: {
      submit: {
        title: 'Submit',
        style: 'mat-flat-button',
        color: 'primary',
      }
    },
    event: {
      submit: (value) => {
        console.log('VALUE', value);
      }
    }
};
