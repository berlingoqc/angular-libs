import { AutoFormData } from "projects/autoform/src/public-api";

export const expansionPanelForm: AutoFormData = {
    items: [],
    type: 'expansion-panel',
    typeData: {
        direction: 'vertical',
        linear: true,
        labelPosition: 'start',
    },
    actionsButtons: {
      submit: {
        title: 'Submit',
      }
    }
};
