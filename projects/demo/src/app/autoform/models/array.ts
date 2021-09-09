import {
    IProperty,
    FormObject,
    ArrayProperty,
} from 'projects/autoform/src/public-api';

export const arrayObject: IProperty[] = [
    {
        name: 'tasks',
        type: 'array',
        min: 2,
        max: 5,
        decorators: {
          class: ['test-caca']
        },
        templates: {
          header: 'Tasks'
        },
        elementType: {
          type: 'object',
          properties: [
            {
              name: 'name',
              type: 'string',
              required: true,
            },
            {
              name: 'description',
              type: 'string'
            }
          ]
        } as FormObject
    } as ArrayProperty,
    {
        name: 'food',
        type: 'array',
        templates: {
          header: 'Awsome heading'
        },
        decorators: {
          class: ['test-caca']
        },
        elementType: {
          type: 'object',
          properties: [
            {
              name: 'name',
              type: 'string',
              required: true,
            },
            {
              name: 'description',
              type: 'string'
            },
            {
              name: 'category',
              type: 'array',
              min: 2,
              max: 5,
              elementType: {
                name: 'date',
                type: 'date'
              }
            } as ArrayProperty
          ]
        } as FormObject
    } as ArrayProperty,

];
