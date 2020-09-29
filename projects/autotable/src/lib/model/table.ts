import {
    TemplateContentData,
    Decorators,
    DecoratorsData,
} from '@berlingoqc/ngx-common';

// Optional configuration of the auto-table
export class AutoTableConfig implements Decorators {
    decorators?: DecoratorsData;
    expandable?: ExpendableConfig;
    headers?: HeaderRow[];
    footers?: FooterRow[];
}

export class AdditionalRow implements Decorators {
    decorators?: DecoratorsData;
    id?: string;
    attachTo?: string;
    content: TemplateContentData;
    colspan?: number;
    rowspan?: number;
}

export class HeaderRow extends AdditionalRow {}

export class FooterRow extends AdditionalRow {}

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
