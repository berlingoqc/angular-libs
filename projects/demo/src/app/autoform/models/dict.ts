import { IProperty, FormObject, DictionnayProperty } from 'projects/autoform/src/public-api';


export const dictObject: IProperty[] = [
  {
    name: 'object',
    type: 'object',
    properties: [
      {
        name: '',
        type: 'dic',
        availableProperty: [
          {
            name: 'number-children',
            type: 'number'
          },
          {
            name: 'location',
            type: 'string',
          },
          {
            name: 'mon-cul',
            type: 'date',
            required: true,
          }
        ],
      } as DictionnayProperty
    ]
  } as FormObject
];
