import { NgModule } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { LoopbackTableComponent } from './loopback-table.component';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { CommonPipeModule } from '@berlingoqc/ngx-common';

@NgModule({
    imports: [
        CommonModule,
        CommonPipeModule,
        MatButtonModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
    ],
    declarations: [LoopbackTableComponent],
    exports: [LoopbackTableComponent],
})
export class LoopbackTableModule {}
