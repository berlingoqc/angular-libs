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


import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DemoAutoTableComponent } from './autotable/demo-auto-table.component';
import { AutoTableModule } from '@berlingoqc/ngx-autotable';
import { DataDecoratorModule } from '@berlingoqc/ngx-common';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home.component';

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

        AutoTableModule,

        DataDecoratorModule,

        MatFormFieldModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
