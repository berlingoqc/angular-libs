import {
    IProperty,
    FormObject,
    DictionnayProperty,
} from 'projects/autoform/src/public-api';

export const dictObject: IProperty[] = [
    {
        name: 'freeform',
        type: 'dic',
        spacer: '  ',
        availableProperty: [
            {
                name: 'number-children',
                type: 'number',
            },
            {
                name: 'location',
                type: 'string',
            },
            {
                name: 'mon-cul',
                type: 'date',
                required: true,
            },
        ],
    } as DictionnayProperty,
];

export const defaultValueDict: any = {
  freeform: {
    'mon-cul': new Date(),
    'number-children': 0
  }
};
