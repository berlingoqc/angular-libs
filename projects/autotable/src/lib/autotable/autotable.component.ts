import {
    OnInit,
    AfterViewInit,
    Component,
    Input,
    ChangeDetectorRef,
    ViewChild,
    EventEmitter,
    OnDestroy,
    ViewEncapsulation,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import {
    LoopbackRestClient,
    CRUDDataSource,
    Where,
    Include,
} from '@berlingoqc/ngx-loopback';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { Observable, Subscription } from 'rxjs';
import { TableColumn } from '../model/column';
import { AdditionalRow, AutoTableConfig, FooterRow } from '../model/table';
import {
    animate,
    state,
    style,
    transition,
    trigger,
} from '@angular/animations';

class ExtraRow {
    aloneRowId: string[];
    aloneRow: AdditionalRow[];

    attachElement?: { [id: string]: AdditionalRow };
}

@Component({
    selector: 'ngx-autotable',
    templateUrl: './autotable.component.html',
    styles: [
        `
            table {
                width: 100%;
            }
        `,
    ],
    styleUrls: ['./autotable.component.scss'],
    animations: [
        trigger('detailExpand', [
            state('collapsed', style({ height: '0px', minHeight: '0' })),
            state('expanded', style({ height: '*' })),
            transition(
                'expanded <=> collapsed',
                animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)'),
            ),
        ]),
    ],
    encapsulation: ViewEncapsulation.None,
})
export class AutoTableComponent<T = any>
    implements OnInit, AfterViewInit, OnDestroy {
    @ViewChild(MatPaginator) paginator: MatPaginator;

    private _columns: TableColumn[];
    private _client: LoopbackRestClient<T>;

    lbSource: CRUDDataSource<T>;
    dataSource = new MatTableDataSource<T>([]);

    currentOffset = 0;
    // Nombre d'item par page
    @Input() pageSize = 50;

    length: number;

    // Where pour requête loopback
    @Input() where: Where = {};
    // Include pour requête loopback
    @Input() includes: Include[] = [];
    // Order poure requête loopback
    @Input() orderBy: string[] = [];

    _config: AutoTableConfig;
    @Input()
    set config(config: AutoTableConfig) {
        this._config = config;
        if (config.footers) {
            this.footerExtraRow = {
                aloneRow: [],
                aloneRowId: [],
            };
            config.footers.forEach((f: AdditionalRow) => {
                if (f.id) {
                    this.footerExtraRow.aloneRowId.push(f.id);
                    this.footerExtraRow.aloneRow.push(f);
                }
                if (f.attachTo) {
                    if (!this.footerExtraRow.attachElement) {
                        this.footerExtraRow.attachElement = {};
                    }
                    this.footerExtraRow.attachElement[f.attachTo] = f;
                }
            });
        }
        if (config.headers) {
            this.headerExtraRow = { aloneRow: [], aloneRowId: [] };
            config.headers.forEach((f: AdditionalRow) => {
                if (f.id) {
                    this.headerExtraRow.aloneRowId.push(f.id);
                    this.headerExtraRow.aloneRow.push(f);
                }
            });
        }
    }

    get config(): AutoTableConfig {
        return this._config;
    }

    // Source, client utilisé pour communiquer avec un serveur crud loopback
    @Input() set source(source: CRUDDataSource<T>) {
        this.lbSource = source;
        this.refreshData();
        this.refreshCount();
    }

    get source(): CRUDDataSource<T> {
        return this.lbSource;
    }

    get columns(): TableColumn[] {
        return this._columns;
    }

    // Liste des columns actives
    @Input() set columns(c: TableColumn[]) {
        this._columns = c;
        this._columns.forEach((cc) => {
            if (cc.display === undefined) {
                cc.display = true;
            }
        });
        this.detectorRef.detectChanges();
    }

    expandedElement: T | null;

    sub: Subscription;

    footerExtraRow: ExtraRow = { aloneRow: [], aloneRowId: [] };
    headerExtraRow: ExtraRow = { aloneRow: [], aloneRowId: [] };

    snatchRow: { [id: string]: FooterRow } = {
        id: {
            attachTo: 'id',
            decorators: {
                style: {
                    footerRow: {
                        class: 'example-first-header-row',
                    },
                },
            },
            content: {
                type: 'string',
                content: 'FUCK THE WORLD',
            },
        },
    };

    // emitter qui est subscribe pour trigger un refresh des données
    @Input() set updateEmitter(ee: EventEmitter<any>) {
        if (this.sub) {
            this.sub.unsubscribe();
        }
        this.sub = ee.asObservable().subscribe(() => {
            this.refreshData();
            this.refreshCount();
        });
    }

    get displayColumns(): string[] {
        if (this._columns) {
            return this._columns.filter((c) => c.display).map((c) => c.id);
        } else {
            return [];
        }
    }

    constructor(private detectorRef: ChangeDetectorRef) {}

    ngOnInit() {}

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
        this.detectorRef.detectChanges();
    }

    ngOnDestroy() {
        if (this.sub) {
            this.sub.unsubscribe();
        }
    }

    onSortChange(sort: Sort) {
        this.orderBy = [
            sort.active + (sort.direction ? ` ${sort.direction}` : ''),
        ];
        this.refreshData();
    }

    handlePage(e: any) {
        this.pageSize = e.pageSize;
        this.currentOffset = e.pageIndex;
        this.refreshData();
    }

    refreshData() {
        this.source
            .get({
                offset: this.currentOffset * this.pageSize,
                include: this.includes,
                limit: this.pageSize,
                where: this.where,
                order: this.orderBy,
            })
            .subscribe((data) => {
                this.dataSource.data = data;
                // this.dataSource.connect().next(data);
            });
    }

    haveAttachedHeader() {}

    haveAttachedFooter(id: string) {
        const item = this.config?.footers?.find((x) => x.attachTo === id);
        if (item) {
        }
    }

    private refreshCount() {
        if (this.source.count) {
            this.source
                .count(this.where)
                .subscribe((count) => (this.length = count.count));
        }
    }
}
