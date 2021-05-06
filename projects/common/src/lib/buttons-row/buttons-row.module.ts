import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonsRowComponent } from './buttons-row/buttons-row.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TemplateContentModule } from '../helper/template-content/template-content.module';

@NgModule({
    declarations: [ButtonsRowComponent],
    imports: [
        CommonModule,
        MatButtonModule,
        MatIconModule,
        TemplateContentModule,
    ],
    exports: [ButtonsRowComponent],
})
export class ButtonsRowModule {}
