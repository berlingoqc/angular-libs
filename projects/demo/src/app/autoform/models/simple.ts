import { FormObject, DateProperty, UnionProperty } from "projects/autoform/src/public-api";

export const simpleObject: FormObject[] = [
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
            {
                name: 'born',
                type: 'date',
                required: true,
            } as DateProperty,
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
                } as any,
            },
        ],
    },
    {
      type: 'object',
      name: 'config',
      properties: [
        {
          name: 'config',
          type: 'union',
          required: true,
          types: {
            'alarm': {
              name: 'alarm',
              type: 'object',
              properties: [
                {
                  name: 'beginning',
                  type: 'object',
                  decorators: {
                    style: {
                      width: '100%',
                      display: 'flex',
                      'flex-direction': 'row'
                    }
                  },
                  templates: {
                    'header': 'Temps démarrage'
                  },
                  properties: [
                    {
                      name: 'hour',
                      type: 'string'
                    },
                    {
                      name: 'minute',
                      type: 'string'
                    }
                  ]
                },
                {
                  name: 'ending',
                  type: 'object',
                  decorators: {
                    style: {
                      display: 'flex',
                      'flex-direction': 'row'
                    }
                  },
                  templates: {
                    'header': 'Temps fin'
                  },
                  properties: [
                    {
                      name: 'hour',
                      required: true,
                      type: 'string'
                    },
                    {
                      name: 'minute',
                      required: true,
                      type: 'string'
                    }
                  ]
                }
              ]
            },
            'manual': {
              name: 'alarm',
              type: 'object',
              properties: [
                {
                  name: 'started',
                  type: 'bool',
                  component: {
                    name: 'checkbox'
                  }
                }
              ]
            }
          }
        } as UnionProperty
      ]
    }
];
