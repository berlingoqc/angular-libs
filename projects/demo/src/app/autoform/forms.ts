import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { of } from 'rxjs';
import {
    AutoFormData,
    FormObject,
    InputProperty,
    MatCheckboxComponent,
    SelectComponent,
} from '@berlingoqc/ngx-autoform';

export const baseForm: AutoFormData = {
    items: [],
    onSubmitValid: () => console.log(''),
    type: 'expansion-panel',
    typeData: {
        direction: 'vertical',
        linear: true,
        labelPosition: 'start',
    },
};

export const simpleForm: AutoFormData = {
    items: [],
    onSubmitValid: () => console.log(''),
    type: 'simple',
};

@Component({
    template: '<mat-icon>favorite</mat-icon><b> Fancy</b> <i> label</i>',
})
export class FancyLabel {}

// Démonstration de hint, prefix , suffix, required et errors
export const baseObject: FormObject[] = [
    {
        name: 'BaseObject',
        decorators: {
            style: {
                display: 'flex',
                'flex-direction': 'column',
                'flex-wrap': 'wrap',
            },
        },
        properties: [
            {
                name: 'hintField',
                displayName: {
                    type: 'component',
                    content: FancyLabel,
                },
                decorators: {
                    style: {
                        width: '500px',
                    },
                },
                type: 'string',
                hint: {
                    content: 'Test bien simple',
                    type: 'string',
                },
            } as InputProperty,
            {
                name: 'telephoe',
                appearance: 'fill',
                displayName: {
                    type: 'string',
                    content: 'Telephone',
                },
                type: 'string',
                placeholder: '418-522-2332',
                preffix: {
                    type: 'string',
                    content: '+1',
                },
                suffix: {
                    type: 'icon',
                    content: 'phone',
                },
                component: {
                    name: 'multipart',
                    objects: {
                        area: {
                            size: 3,
                        },
                        exchange: {
                            size: 3,
                        },
                        subscriber: {
                            size: 4,
                        },
                    },
                    spacers: [
                        {
                            type: 'string',
                            content: '-',
                        },
                        {
                            type: 'string',
                            content: '-',
                        },
                    ],
                    transformer: {
                        reconstruct: (telephone: any) => {
                            if (telephone) {
                                return Object.values(telephone).join('-');
                            }
                            return '';
                        },
                        transform: (telephone: string) => {
                            if (telephone) {
                                const split = telephone.split('-');
                                return {
                                    area: split[0],
                                    exchange: split[1],
                                    subscriber: split[2],
                                };
                            }
                            return { area: '', exchange: '', subscriber: '' };
                        },
                    },
                    validators: [Validators.pattern('^[0-9]*$')],
                },
            } as InputProperty,
            {
                name: 'Champs avec une limite de 5 characteres',
                type: 'string',
                hintAlign: 'end',
                maxlength: 5,
                hint: {
                    content: (input) => input?.value.length + '/5',
                    type: 'func',
                },
            } as InputProperty,
            {
                name: 'long_string',
                type: 'string',
                component: {
                    name: 'textarea',
                },
            },
            {
                name: 'Champs avec un preffix et suffix',
                type: 'string',
                required: true,
                placeholder: '432-432-423',
                appearance: 'fill',
                hideRequired: false,
                floatLabel: 'always',
                errors: {
                    required: {
                        text: 'Ce champs est requis mon amis',
                    },
                },
                preffix: {
                    type: 'html',
                    content: '+1 &nbsp;',
                },
                suffix: {
                    type: 'icon',
                    content: 'mode_edit',
                },
            } as InputProperty,
            {
                name: 'select-mat',
                type: 'string',
                required: true,
                component: {
                    name: 'select',
                    type: 'mat',
                    noneOption: {
                        type: 'string',
                        content: '--',
                    },
                    options: [
                        {
                            value: 'value',
                            display: {
                                type: 'string',
                                content: 'value 2',
                            },
                        },
                    ],
                } as SelectComponent,
            },
            {
                name: 'multi-choice string',
                type: 'string',
                required: true,
                subtype: {
                    name: 'autocomplete',
                    items: ['Un', 'Deux', 'Trois'],
                },
            } as InputProperty,
            {
                name: 'multi-choice string obs',
                type: 'string',
                required: true,
                subtype: {
                    name: 'autocomplete',
                    items: of(['un', 'deux', 'trois']),
                },
            } as InputProperty,
            {
                name: 'multi-choice string func',
                type: 'string',
                required: true,
                errors: {
                    required: {
                        text: 'Le champs est requis',
                    },
                },
                subtype: {
                    name: 'autocomplete',
                    onlyItemPresent: true,
                    items: () => of(['un', 'deux', 'trois']),
                } as any,
            },
        ],
        type: 'object',
    },
];

export const baseObject2: FormObject[] = [
    {
        name: 'name',
        type: 'object',
        properties: [
            {
                name: 'fistName',
                type: 'string',
                required: true,
            },
            {
                name: 'lastName',
                type: 'string',
            },
        ],
    },
    {
        name: 'addresse',
        type: 'object',
        decorators: {
            style: {
                display: 'flex',
                'flex-direction': 'row',
            },
        },
        properties: [
            {
                name: 'civic',
                type: 'number',
                required: true,
            },
            {
                name: 'street',
                type: 'string',
                required: true,
            },
            {
                name: 'appartment',
                type: 'bool',
                required: true,
                component: {
                    name: 'radio',
                    labelPosition: 'after',
                } as MatCheckboxComponent,
            },
        ],
    },
];
