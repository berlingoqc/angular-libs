import {
    OnInit,
    AfterViewInit,
    Component,
    Input,
    TemplateRef,
    ChangeDetectorRef,
    ViewChild,
    EventEmitter,
    OnDestroy,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import {
    LoopbackRestClient,
    LoopbackTableRowDataSource,
} from '../loopback-rest';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { Where, Include } from '../loopback-model';
import { Observable, Subscription } from 'rxjs';

// Définition d'une colonne dans LoopbackTable
export interface TableColumn {
    // definition de la column (son id), si null utilise le titre
    def?: string;
    // titre de la column
    title: string;
    // indique si on affiche la column
    display?: boolean;
    /** définit de la column
     *
     * string: nom de la property de l'object à affiché (permet le sorting)
     * TemplateRef: Template utilisé recoit let-element
     * (T) => string: Fonction utilisé pour transformer l'object
     */
    elementField:
        | string
        | TemplateRef<any>
        | ((any) => string | Observable<string> | Promise<string>);
}

export class PageSettings {
    nbrPage: number;
}

@Component({
    selector: 'bsl-loopback-table',
    templateUrl: './loopback-table.component.html',
    styles: [
        `
            table {
                width: 100%;
            }
        `,
    ],
})
export class LoopbackTableComponent<T = any>
    implements OnInit, AfterViewInit, OnDestroy {
    @ViewChild(MatPaginator) paginator: MatPaginator;

    private _columns: TableColumn[];
    private _client: LoopbackRestClient<T>;

    lbSource: LoopbackTableRowDataSource<T>;
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

    // Source, client utilisé pour communiquer avec un serveur crud loopback
    @Input() set source(source: LoopbackTableRowDataSource<T>) {
        this.lbSource = source;
        this.refreshData();
        this.refreshCount();
    }

    get source(): LoopbackTableRowDataSource<T> {
        return this.lbSource;
    }

    get columns(): TableColumn[] {
        return this._columns;
    }

    // Liste des columns actives
    @Input() set columns(c: TableColumn[]) {
        this._columns = c;
        this._columns.forEach((cc) => {
            if (cc.def === undefined) {
                cc.def = cc.title;
            }
            if (cc.display === undefined) {
                cc.display = true;
            }
        });
        this.detectorRef.detectChanges();
    }

    sub: Subscription;

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
            return this._columns.filter((c) => c.display).map((c) => c.def);
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
                //this.dataSource.connect().next(data);
            });
    }

    private refreshCount() {
        if (this.source.count) {
            this.source
                .count(this.where)
                .subscribe((count) => (this.length = count.count));
        }
    }
}
