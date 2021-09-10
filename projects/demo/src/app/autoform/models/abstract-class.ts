import {
    FormAbstractObject,
    IProperty,
} from 'projects/autoform/src/public-api';

export const abstractClassForm: IProperty[] = [
    {
        name: 'plane',
        type: 'abstractobject',
        required: true,
        typeKey: 'type',
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

export const abstractClassDefaultValue = {
  plane: {
    type: 'planner',
    serialNumber: 'X1D:142',
  }
};
