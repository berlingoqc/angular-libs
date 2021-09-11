import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { AutoFormModule, FormSaverModule } from '@berlingoqc/ngx-autoform';
import { MatIconModule } from '@angular/material/icon';
import { FancyLabel } from './models';
import { BuilderComponent } from './builder.component';

@NgModule({
    declarations: [FancyLabel, BuilderComponent],
    imports: [
        CommonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        ReactiveFormsModule,

        AutoFormModule,
    ],
    entryComponents: [FancyLabel],
    providers: [DatePipe],
    exports: [],
})
export class AutoformModule {}
