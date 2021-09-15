;
import { of } from 'rxjs';

import { IProperty, FormObject, FormAbstractObject,
  AutoFormData, DictionnayProperty, ArrayProperty } from '../models';
import { SelectComponent } from '../models/component/select.component';

const getPropertyFormGroupType = (name, properties: IProperty[]) => ({
    name,
    type: 'object',
    properties: [
        {
            name: 'typeData',
            type: 'object',
            properties: properties
        },
    ],
});

const getChildComponentProperties = (name): IProperty[] => {
  return [
  {
    name: 'component',
    type: 'abstractobject',
    typeKey: 'name',
    abstractClassName: undefined,
    templates: {
      header: 'Component'
    },
    properties: [],
    childs: [],
  } as FormAbstractObject,
  ]
}

const getButtonsObject = (name) =>
    ({
        name,
        type: 'object',
        optional: true,
        templates: {
          header: name,
        },
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
    return {
        type: 'simple',
        templates: {
          header: 'AutoForm Builder'
        },
        items: [
            {
                name: 'object',
                type: 'abstractobject',
                abstractClassName: 'simple',
                typeKey: 'type',
                templates: {
                  header: 'AutoFormData'
                },
                childs: [
                    getPropertyFormGroupType('expension-panel', []),
                    getPropertyFormGroupType('stepper', [
                      {
                        name: 'direction',
                        type: 'string',
                        component: {
                          name: 'select',
                          type: 'mat',
                          options: {
                            displayContent: (e) => e,
                            displayTitle: (e) => e,
                            value: of(['vertical', 'horizontal']),
                          }
                        } as SelectComponent,
                      },
                      {
                        name: 'linear',
                        type: 'bool'
                      }
                    ]),
                ],
                properties: [
                    {
                        name: 'items',
                        type: 'array',
                        templates: {
                          header: 'Properties'
                        },
                        elementType: {
                            type: 'abstractobject',
                            typeKey: 'type',
                            properties: [
                                {
                                    name: 'name',
                                    type: 'string',
                                    required: true,
                                },
                                {
                                    // template-content
                                    name: 'displayName',
                                    type: 'string',
                                },
                                {
                                    name: 'required',
                                    type: 'bool',
                                    component: {
                                      name: 'checkbox'
                                    }
                                },
                                {
                                    name: 'disabled',
                                    type: 'bool',
                                    component: {
                                      name: 'checkbox'
                                    }
                                },
                                {
                                    name: 'errors',
                                    type: 'dic',
                                    templates: {
                                      header: 'Errors'
                                    },
                                    availableProperty: [],
                                } as DictionnayProperty,
                                {
                                    name: 'decorators',
                                    type: 'dic',
                                    templates: {
                                      header: 'Decorators'
                                    },
                                    availableProperty: [],
                                } as DictionnayProperty,
                                {
                                    name: 'templates',
                                    type: 'dic',
                                    templates: {
                                      header: 'Templates'
                                    },
                                    availableProperty: [],
                                } as DictionnayProperty,

                            ],
                            childs: [
                                {
                                    name: 'date',
                                    type: 'date',
                                    properties: getChildComponentProperties('date'),
                                },
                                {
                                    name: 'dic',
                                    type: 'dic',
                                    properties: getChildComponentProperties('dic'),
                                },
                                {
                                    name: 'string',
                                    type: 'string',
                                    properties: getChildComponentProperties('string'),
                                },
                                {
                                    name: 'bool',
                                    type: 'bool',
                                    properties: getChildComponentProperties('bool'),
                                },
                                {
                                    name: 'number',
                                    type: 'number',
                                    properties: getChildComponentProperties('number'),
                                },
                                {
                                    name: 'union',
                                    type: 'union',
                                    properties: getChildComponentProperties('union'),
                                },
                                {
                                    name: 'object',
                                    type: 'object',
                                    properties: getChildComponentProperties('object'),
                                },
                                {
                                    name: 'abstractobject',
                                    type: 'abstractobject',
                                    properties: getChildComponentProperties('abstractobject'),
                                },
                                {
                                    name: 'array',
                                    type: 'array',
                                    properties: getChildComponentProperties('array'),
                                },
                            ],
                        } as FormAbstractObject,
                    } as ArrayProperty,
                    {
                        name: 'actionsButtons',
                        type: 'object',
                        templates: {
                          header: 'Actions Buttons'
                        },
                        properties: [
                            getButtonsObject('submit'),
                            getButtonsObject('reset'),
                        ],
                    } as FormObject,
                ],
            } as FormAbstractObject,
        ],

        event: {
          submit: (form) => {
            console.log('FORM', form);
            return of();
          }
        }
    };
};
