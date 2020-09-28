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
import { MatFormFieldModule } from '@angular/material/form-field';
import { TestMultiPartMatInputComponent } from './autoform/test-multi-part-mat-input.component';

@NgModule({
  declarations: [AppComponent, TestMultiPartMatInputComponent],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AutoformModule,
    AutoFormModule.forRoot(),
    AutoFormRegister,

    MatFormFieldModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
