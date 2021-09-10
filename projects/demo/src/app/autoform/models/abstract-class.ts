import {
    DateProperty,
    DateRangeSubType,
    FormAbstractObject,
    IProperty,
} from 'projects/autoform/src/public-api';

export const abstractClassForm: IProperty[] = [
    {
        name: 'plane',
        type: 'abstractobject',
        required: true,
        abstractClassName: 'Plane',
        properties: [
          {
            name: 'serialNumber',
            type: 'string'
          },
          {
            name: 'constructionDate',
            type: 'date'
          },
        ],
        childs: [
          {
            name: 'planner',
            type: 'object',
            properties: [
              {
                name: 'wingSpan',
                type: 'number',
                required: true,
              }
            ],
          },
          {
            name: 'monoplane',
            type: 'object',
            properties: [
              {
                name: 'odometer',
                type: 'number',
                required: true,
              }
            ],
          }
        ],
    } as FormAbstractObject,
];
