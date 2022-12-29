import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CodeDemoComponent, CodeSampleDirective } from './code-demo.component';
import { MatLegacyTabsModule as MatTabsModule } from '@angular/material/legacy-tabs';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [CodeDemoComponent,  CodeSampleDirective],
  imports: [
    CommonModule,
    MatTabsModule,

    HttpClientModule,
  ],
  exports: [CodeDemoComponent],
})
export class CodeDemoModule { }
