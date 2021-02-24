import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    ComponentFactoryResolver,
    Directive,
    Injectable,
    Injector,
    Input,
    OnInit,
    PipeTransform,
    Type,
    ViewContainerRef,
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import {
    ComponentExtra,
    TemplateContentData,
    TemplateContentDataStructure,
    TEMPLATE_CONTENT_CONTEXT,
    TEMPLATE_CONTENT_PARENT,
} from './template-content-type';

/*
@Component({
    template: `{{ context | json }} {{ parent | json }}`,
})
export class DemoComponent {
    @Input() data: string;
    constructor(
        @Inject(TEMPLATE_CONTENT_CONTEXT) public context: any,
        @Inject(TEMPLATE_CONTENT_PARENT) public parent: any,
    ) {}
}
*/

@Directive({
    selector: '[templateMarker]',
})
export class TemplateMarkerDirective {
    @Input('templateMarker') set tc(tc: TemplateContentComponent) {
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(
            tc.innerContent.content as Type<any>,
        );

        this.ref.clear();

        const inj = Injector.create({
            providers: [
                {
                    provide: TEMPLATE_CONTENT_CONTEXT,
                    useValue: tc.context,
                },
                {
                    provide: TEMPLATE_CONTENT_PARENT,
                    useValue: tc.parent,
                },
            ],
            parent: this.injector,
        });

        const componentRef = this.ref.createComponent<any>(
            componentFactory,
            0,
            inj,
        );

        const extra: ComponentExtra = tc.innerContent.extra;
        if (extra) {
            if (extra.inputs) {
                Object.entries(extra.inputs).forEach(([k, v]) => {
                    console.log(k, v);
                    componentRef.instance[k] = v;
                });
            }
        }
    }

    constructor(
        public ref: ViewContainerRef,
        private injector: Injector,
        private componentFactoryResolver: ComponentFactoryResolver,
    ) {
    }
}

@Injectable()
export class ServiceTest {
    test: string;
}

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
        <ng-container *ngIf="innerContent" [ngSwitch]="innerContent.type">
            <ng-container *ngSwitchCase="'string'">
                {{ innerContent.content }}
            </ng-container>
            <ng-container *ngSwitchCase="'pipe'">
                {{ innerContent.content }}
            </ng-container>
            <ng-container *ngSwitchCase="'translation'">
                {{ innerContent.content | translate }}
            </ng-container>
            <div *ngSwitchCase="'component'">
                <div *templateMarker="{ content: innerContent }"></div>
                <!--<ng-container
                    *ngComponentOutlet="
                        content.content;
                        injector: customInjector
                    "
                ></ng-container>-->
            </div>
            <ng-container *ngSwitchCase="'template'">
                <ng-container
                    [ngTemplateOutlet]="innerContent.content"
                    [ngTemplateOutletContext]="{
                        parent: parent,
                        context: innerContext,
                        extra: innerContent.extra
                    }"
                >
                </ng-container>
            </ng-container>
            <ng-container *ngSwitchCase="'func'">
                {{ callFunction() | asyncAll }}
            </ng-container>
            <div *ngSwitchCase="'html'" [innerHTML]="innerContent.content"></div>
            <mat-icon *ngSwitchCase="'icon'"> {{ innerContent.content }}</mat-icon>
        </ng-container>
    `,
    changeDetection: ChangeDetectionStrategy.Default,
})
export class TemplateContentComponent
    implements AfterViewInit, OnInit, AfterViewInit {
    shadowThis;
    @Input() content: TemplateContentData;
    @Input() innerContent: TemplateContentDataStructure;
    // Reference to the parent component
    @Input() parent: Type<any>;
    // Reference to the exection content
    @Input() context: any;

    customInjector: Injector = Injector.create({
        providers: [{ provide: ServiceTest, useValue: new ServiceTest() }],
        parent: this.injector,
    });

    constructor(private sanitizer: DomSanitizer, private injector: Injector) {
        this.shadowThis = this;
    }

    ngOnInit() {
        const typeContent = typeof this.content;
        if(typeContent == 'string') {
          this.innerContent = {type: 'string', content: this.content as string};
          return;
        } else if(typeContent == 'function') {
          this.innerContent = {type: 'func', content: this.content as any}
          return;
        } else {
          this.innerContent = this.content as TemplateContentDataStructure;
        }
        if (this.innerContent?.type === 'html') {
            this.innerContent.content = this.sanitizer.bypassSecurityTrustHtml(
                this.innerContent.content as any,
            ) as any;
        } else if (this.innerContent?.type === 'pipe') {
            this.renderPipe();
        } else if (this.innerContent?.type === 'component') {
            this.customInjector = Injector.create({
                providers: [
                    {
                        provide: ServiceTest,
                        useFactory: () => new ServiceTest(),
                        deps: [],
                    },
                ],
                parent: this.injector,
            });
        }
    }

    ngAfterViewInit() {}

    // Dans le cas d'une fonction comme contenu
    callFunction() {
        return (this.innerContent.content as any)(this.parent, this.context);
    }

    // Render pipe
    renderPipe() {
        const d = this.injector.get(this.innerContent.extra.pipe) as PipeTransform;
    }
}
