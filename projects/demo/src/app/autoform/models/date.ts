import { DateProperty, DateRangeSubType, IProperty } from "projects/autoform/src/public-api";

export const dateForm: IProperty[] = [
    {
        name: 'simple',
        type: 'date',
        displayName: 'Date simple',
        required: true,
    } as DateProperty,
    {
        name: 'range',
        type: 'date',
        displayName: 'Date range',
        required: true,
        subtype: {
            name: 'date-range',
        } as DateRangeSubType,
    } as DateProperty,
];
