import {
    TemplateContentData,
    Decorators,
    DecoratorsData,
} from '@berlingoqc/ngx-common';

// Optional configuration of the auto-table
export class AutoTableConfig implements Decorators {
    decorators?: DecoratorsData;
    expandable?: ExpendableConfig;
}

export interface ExpendableConfig {
    content: TemplateContentData;
}

export const templateTable = `
        <ngx-autotable
            [columns]="columns"
            [source]="dataSource"
            [config]="config"
        ></ngx-autotable>
`;
