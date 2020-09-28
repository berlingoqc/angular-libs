import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CommonPipeModule } from '@berlingoqc/ngx-common';
import { TemplateContentComponent } from './template-content.component';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    imports: [CommonModule, CommonPipeModule, MatIconModule, TranslateModule],
    declarations: [TemplateContentComponent],
    exports: [TemplateContentComponent],
})
export class TemplateContentModule {}
