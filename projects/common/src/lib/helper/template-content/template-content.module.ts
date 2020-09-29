import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
    TemplateContentComponent,
    TemplateMarkerDirective,
} from './template-content.component';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { CommonPipeModule } from '../../pipe/common-pipe.module';

@NgModule({
    imports: [CommonModule, CommonPipeModule, MatIconModule, TranslateModule],
    declarations: [TemplateContentComponent, TemplateMarkerDirective],
    exports: [TemplateContentComponent],
})
export class TemplateContentModule {}
