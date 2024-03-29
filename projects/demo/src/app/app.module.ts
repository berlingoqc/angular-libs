import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AutoformModule } from './autoform/autoform.module';
import { CommonModule } from '@angular/common';
import {
    AutoFormModule,
    AutoFormRegister,
} from 'projects/autoform/src/public-api';


import {MatLegacyListModule as MatListModule} from '@angular/material/legacy-list';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { DemoAutoTableComponent } from './autotable/demo-auto-table.component';
import { AutoTableModule } from '@berlingoqc/ngx-autotable';
import { DataDecoratorModule } from '@berlingoqc/ngx-common';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home.component';
import { ThemeModule } from 'projects/common/src/public-api';

@NgModule({
    declarations: [
        AppComponent,
        DemoAutoTableComponent,
        HomeComponent,
    ],
    imports: [
        CommonModule,
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        MatSidenavModule,
        MatToolbarModule,
        MatIconModule,
        MatListModule,
        AutoformModule,
        AutoFormModule.forRoot(),
        AutoFormRegister,
        HttpClientModule,

        ThemeModule,

        AutoTableModule,

        DataDecoratorModule,

        MatFormFieldModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
