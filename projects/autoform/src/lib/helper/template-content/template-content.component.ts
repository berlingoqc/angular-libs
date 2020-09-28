import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ComponentFactoryResolver,
  Directive,
  Injector,
  Input,
  OnInit,
  PipeTransform,
  QueryList,
  Sanitizer,
  TemplateRef,
  Type,
  ViewChildren,
  ViewContainerRef,
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { TemplateContent, TemplateContentData } from './template-content-type';

@Component({
  selector: 'template-content',
  styles: [
    `
      :host {
        display: contents;
      }
    `,
  ],
  template: `
    <ng-container *ngIf="content" [ngSwitch]="content.type">
      <ng-container *ngSwitchCase="'string'">
        {{ content.content }}
      </ng-container>
      <ng-container *ngSwitchCase="'pipe'">
        {{ content.content }}
      </ng-container>
      <ng-container *ngSwitchCase="'translation'">
        {{ content.content | translate }}
      </ng-container>
      <ng-container
        *ngSwitchCase="'component'"
        [ngComponentOutlet]="content.content"
      >
      </ng-container>
      <ng-container *ngSwitchCase="'template'">
        <ng-container
          [ngTemplateOutlet]="content.content"
          [ngTemplateOutletContext]="{
            parent: parent,
            context: context,
            extra: content.extra
          }"
        >
        </ng-container>
      </ng-container>
      <ng-container *ngSwitchCase="'func'">
        {{ callFunction() | asyncAll }}
      </ng-container>
      <div *ngSwitchCase="'html'" [innerHTML]="content.content"></div>
      <mat-icon *ngSwitchCase="'icon'"> {{ content.content }}</mat-icon>
    </ng-container>
  `,
  changeDetection: ChangeDetectionStrategy.Default,
})
export class TemplateContentComponent implements AfterViewInit, OnInit {
  @Input() content: TemplateContentData;
  // Reference to the parent component
  @Input() parent: Type<any>;
  // Reference to the exection content
  @Input() context: any;

  constructor(private sanitizer: DomSanitizer, private injector: Injector) {}

  ngOnInit() {
    if (this.content?.type === 'html') {
      this.content.content = this.sanitizer.bypassSecurityTrustHtml(
        this.content.content as any
      ) as any;
    } else if (this.content?.type == 'pipe') {
      this.renderPipe();
    }
  }

  ngAfterViewInit() {}

  // Dans le cas d'une fonction comme contenu
  callFunction() {
    return (this.content.content as any)(this.parent, this.context);
  }

  // Render pipe
  renderPipe() {
    const d = this.injector.get(this.content.extra.pipe) as PipeTransform;
    this.content.content = d.transform(
      this.content.content,
      this.content.extra.args
    );
  }
}
