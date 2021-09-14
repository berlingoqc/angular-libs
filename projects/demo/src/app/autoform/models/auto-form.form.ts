import { FormGroup } from '@angular/forms';
import {
    ArrayProperty,
    AutoFormData,
    DictionnayProperty,
    FormAbstractObject,
    FormObject,
} from 'projects/autoform/src/lib/models';
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

const getPropertyFormGroupType = (name) => ({
    name,
    type: 'object',
    properties: [
        {
            name: 'typeData',
            type: 'object',
            properties: [],
        },
    ],
});

const getButtonsObject = (name) =>
    ({
        name,
        type: 'object',
        properties: [
            {
                name: 'title',
                type: 'string',
            },
            {
                name: 'style',
                type: 'string',
                component: {
                    name: 'select',
                    type: 'mat',
                    options: {
                        displayContent: (e) => e,
                        displayTitle: (e) => e,
                        value: of([
                            'mat-button',
                            'mat-flat-button',
                            'mat-stroked-button',
                            'mat-icon-button',
                            'mat-fab',
                            'mat-mini-fab',
                        ]),
                    },
                } as SelectComponent,
            },
            {
                name: 'color',
                type: 'string',
                component: {
                    name: 'select',
                    type: 'mat',
                    options: {
                        displayContent: (e) => e,
                        displayTitle: (e) => e,
                        value: of(['color', 'primary', 'error']),
                    },
                } as SelectComponent,
            },
        ],
    } as FormObject);

export const autoFormFormData: () => AutoFormData = () => {
  const d = new FormGroup(null);
    return {
        type: 'simple',
        items: [
            {
                name: 'object',
                type: 'abstractobject',
                abstractClassName: 'simple',
                typeKey: 'type',
                childs: [
                    getPropertyFormGroupType('expension-panel'),
                    getPropertyFormGroupType('stepper'),
                ],
                properties: [
                    {
                        name: 'items',
                        type: 'array',
                        elementType: {
                            type: 'abstractobject',
                            abstractClassName: 'IProperty',
                            typeKey: 'type',
                            properties: [
                                {
                                    name: 'name',
                                    type: 'string',
                                },
                                {
                                    // template-content
                                    name: 'displayName',
                                    type: 'string',
                                },
                                {
                                    name: 'required',
                                    type: 'bool'
                                },
                                {
                                    name: 'disabled',
                                    type: 'bool'
                                },
                                {
                                    name: 'errors',
                                    type: 'dic',
                                    availableProperty: [],
                                } as DictionnayProperty,
                                {
                                    name: 'decorators',
                                    type: 'dic',
                                    availableProperty: [],
                                } as DictionnayProperty,
                                {
                                    name: 'templates',
                                    type: 'dic',
                                    availableProperty: [],
                                } as DictionnayProperty,
                                {
                                    name: 'component',
                                    type: 'abstractobject',
                                    properties: [],
                                    childs: [],
                                } as FormAbstractObject,
                                {
                                    name: 'subtype',
                                    type: 'abstractobject',
                                    properties: [],
                                    childs: [],
                                } as FormAbstractObject,
                            ],
                            childs: [
                                {
                                    name: 'date',
                                    type: 'date',
                                    properties: [],
                                },
                                {
                                    name: 'dic',
                                    type: 'dic',
                                    properties: [],
                                },
                                {
                                    name: 'string',
                                    type: 'string',
                                    properties: [],
                                },
                                {
                                    name: 'bool',
                                    type: 'bool',
                                    properties: [],
                                },
                                {
                                    name: 'number',
                                    type: 'number',
                                    properties: [],
                                },
                                {
                                    name: 'union',
                                    type: 'union',
                                    properties: [],
                                },
                                {
                                    name: 'object',
                                    type: 'object',
                                    properties: [],
                                },
                                {
                                    name: 'abstractobject',
                                    type: 'abstractobject',
                                    properties: [],
                                },
                                {
                                    name: 'array',
                                    type: 'array',
                                    properties: [],
                                },
                            ],
                        } as FormAbstractObject,
                    } as ArrayProperty,
                    {
                        name: 'actionsButtons',
                        type: 'object',
                        properties: [
                            getButtonsObject('submit'),
                            getButtonsObject('reset'),
                        ],
                    } as FormObject,
                ],
            } as FormAbstractObject,
        ],
    };
};
