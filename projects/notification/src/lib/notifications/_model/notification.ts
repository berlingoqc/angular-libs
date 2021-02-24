import { TemplateContentData } from '@berlingoqc/ngx-common';

export interface NotificationDData {
    from: string;
    NotificationD: {
        title: string;
        body: any;
    };
    collapse_key: string;
}

export interface NotificationD {
    id?: string;
    profileId?: string;
    title: TemplateContentData;
    titleContext?: any;
    body: TemplateContentData;
    bodyContext?: any;
    data?: any;
    duration?: number;
    readed?: boolean;
    deleted?: boolean;

    actions?: {
        text: string;
        color: string;
        click: () => any;
    }[];
}
