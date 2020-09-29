import { Component, Inject, Input, Optional } from '@angular/core';
import { TableColumn } from '@berlingoqc/ngx-autotable';
import { StaticDataSource } from '@berlingoqc/ngx-loopback';
import {
    AutoTableConfig,
    templateTable,
} from 'projects/autotable/src/public-api';
import {
    ServiceTest,
    TEMPLATE_CONTENT_CONTEXT,
    TEMPLATE_CONTENT_PARENT,
} from 'projects/common/src/public-api';

@Component({
    template: templateTable,
})
export class DemoAutoTableComponent {
    dataSource = new StaticDataSource([{ id: 'dsafgaf' }, { id: 'abss' }]);
    columns: TableColumn[] = [
        {
            id: 'id',
            title: {
                type: 'string',
                content: 'Identifiant',
            },
            elementField: {
                type: 'func',
                content: (e) => e.id,
            },
        },
    ];
    config: AutoTableConfig = {
        expandable: {
            content: {
                type: 'string',
                content: 'more detail more detail',
                extra: {
                    inputs: {
                        data: 'fuck this',
                    },
                },
            },
        },
    };
}
