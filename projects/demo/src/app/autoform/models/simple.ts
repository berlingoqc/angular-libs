import { FormObject } from "projects/autoform/src/public-api";

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
                } as any,
            },
        ],
    },
];
