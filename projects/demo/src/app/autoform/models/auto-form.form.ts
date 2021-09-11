import { AutoFormData, FormObject } from 'projects/autoform/src/lib/models';
import { SelectComponent } from 'projects/autoform/src/public-api';
import { of } from 'rxjs';

const optionsTypeForm = [
    'simple',
    'bottom-sheet',
    'card',
    'dialog',
    'expansion-panel',
    'stepper',
    'tabs',
];

export const autoFormFormData: AutoFormData = {
    type: 'simple',
    items: [
        {
            name: 'object',
            type: 'object',
            properties: [
                {
                    name: 'type',
                    type: 'string',
                    component: {
                        name: 'select',
                        type: 'mat',
                        options: {
                            displayContent: (e) => e,
                            displayTitle: (e) => e,
                            value: of(optionsTypeForm),
                        },
                    } as SelectComponent,
                },
            ],
        } as FormObject,
    ],
};
