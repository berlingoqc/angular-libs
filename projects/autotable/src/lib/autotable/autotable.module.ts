import { NgModule } from '@angular/core';
import { MatLegacyTableModule as MatTableModule } from '@angular/material/legacy-table';
import { CommonModule } from '@angular/common';
import { AutoTableComponent } from './autotable.component';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyPaginatorModule as MatPaginatorModule } from '@angular/material/legacy-paginator';
import { MatSortModule } from '@angular/material/sort';
import {
    CommonPipeModule,
    TemplateContentModule,
    DataDecoratorModule,
} from '@berlingoqc/ngx-common';
import { LayoutModule } from '@angular/cdk/layout';

/**
 * Truc a implenter
 *
 * 1. Paramètrer le sorting , filtering , style de la table et des td tr
 * 2. Ajouter expandable rows
 * 3. Ajouter interface pour activer , déactiver les columns
 * 4. Ajouter footer/header rows
 * 5. Ajouter intégretais paging + scrolling
 * 6. Ajouter support pour sticky columns
 * 7. Ajouter utilitaire pour rendre le tableau sélectionnable
 */

@NgModule({
    imports: [
        // From angular
        CommonModule,

        // From ngx-common
        CommonPipeModule,
        DataDecoratorModule,
        TemplateContentModule,

        // From cdk
        LayoutModule,

        // From material
        MatButtonModule,
        MatTableModule,
        MatSortModule,
        MatPaginatorModule,
        MatSortModule,
    ],
    declarations: [AutoTableComponent],
    exports: [AutoTableComponent],
})
export class AutoTableModule {}
