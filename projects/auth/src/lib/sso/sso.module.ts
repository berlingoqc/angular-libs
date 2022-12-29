import { NgModule } from '@angular/core';

import { SSOSettingsService } from './service';
import { SsoInfoComponent } from './component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacyCheckboxModule as MatCheckboxModule } from '@angular/material/legacy-checkbox';
import { MatLegacyChipsModule as MatChipsModule } from '@angular/material/legacy-chips';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatInputModule,
        MatCheckboxModule,
        MatChipsModule,
    ],
    declarations: [
        SsoInfoComponent
    ],
    exports: [SsoInfoComponent],
    providers: [SSOSettingsService]
})
export class SSOModule {

}