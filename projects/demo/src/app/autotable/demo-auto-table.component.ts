import { Component, Inject, Input, Optional } from '@angular/core';
import { TableColumn } from '@berlingoqc/ngx-autotable';
import { StaticDataSource } from '@berlingoqc/ngx-loopback';
import {
    AutoTableConfig,
    templateTable,
} from 'projects/autotable/src/public-api';

@Component({
    template: templateTable,
})
export class DemoAutoTableComponent {
    dataSource = new StaticDataSource([
        { id: 'dsafgaf', name: 'george' },
        { id: 'abss', name: 'paulin' },
    ]);
    columns: TableColumn[] = [
        {
            id: 'id',
            title: {
                type: 'string',
                content: 'Identifiant',
            },
            content: {
                type: 'func',
                content: (e) => e.id,
            },
        },
        {
            id: 'name',
            title: {
                type: 'string',
                content: 'Nom',
            },
            content: {
                type: 'func',
                content: (e) => e.name,
            },
        },
    ];
    config: AutoTableConfig = {
        decorators: {
            style: {
                table: {
                    class: ['mat-elevation-z8'],
                },
            },
        },
        headers: [
            {
                decorators: {
                    style: {
                        headerRow: {
                            style: {
                                'font-style': 'italic',
                            },
                        },
                    },
                },
                id: 'item-description',
                content: {
                    type: 'string',
                    content: 'Description',
                },
            },
        ],
        footers: [
            {
                decorators: {
                    style: {
                        footerRow: {
                            class: ['example-second-footer-row'],
                        },
                    },
                },
                id: 'footer',
                content: {
                    type: 'string',
                    content: 'dsadsadsa',
                },
                colspan: 2,
            },
            /*{
                attachTo: 'id',
                content: {
                    type: 'string',
                    content: 'ID footer',
                },
                colspan: 2,
            },*/
        ],
        /*expandable: {
            content: {
                type: 'string',
                content: 'more detail more detail',
                extra: {
                    inputs: {
                        data: 'fuck this',
                    },
                },
            },
        },*/
    };
}
