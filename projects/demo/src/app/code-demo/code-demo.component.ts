import { HttpClient } from '@angular/common/http';
import { Component, Directive, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import 'prismjs';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-typescript';

declare var Prism;

@Component({
  selector: 'code-sample',
  template: `<pre><code [innerHtml]="content$ | async"></code></pre>`
})
export class CodeSampleDirective implements OnInit {

  baseURL: string = "https://raw.githubusercontent.com/berlingoqc/angular-libs/develop/projects";

  @Input() codeSamplePath: string;

  content$: Observable<string>;

  constructor(
    private http: HttpClient,
  ) {
  }

  ngOnInit() {
    if (this.codeSamplePath) {
      this.content$ = this.http.get(
          `${this.baseURL}${this.codeSamplePath}`,
          {responseType: 'text'}
      ).pipe(map(text => Prism.highlight(text, Prism.languages.typescript)));
    }
  }

}

@Component({
  selector: 'app-code-demo',
  template: `
    <mat-tab-group dynamicHeight>
      <mat-tab label="Demo">
        <ng-content></ng-content>
      </mat-tab>
      <mat-tab [label]="snipet.name" *ngFor="let snipet of snipets">
        <code-sample [codeSamplePath]="snipet.path"></code-sample>
      </mat-tab>
    </mat-tab-group>
  `,
  styles: [
  ]
})
export class CodeDemoComponent implements OnInit {

  @Input() snipets: {name: string, path: string }[];

  ngOnInit(): void {
  }

}
