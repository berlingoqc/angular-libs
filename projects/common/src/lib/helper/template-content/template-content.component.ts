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
            tc.content.content as Type<any>,
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

        const extra: ComponentExtra = tc.content.extra;
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
        console.log('STRING STRINGs');
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
            <div *ngSwitchCase="'component'">
                <div *templateMarker="{ content: content }"></div>
                <!--<ng-container
                    *ngComponentOutlet="
                        content.content;
                        injector: customInjector
                    "
                ></ng-container>-->
            </div>
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
export class TemplateContentComponent
    implements AfterViewInit, OnInit, AfterViewInit {
    shadowThis;
    @Input() content: TemplateContentData;
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
        if (this.content?.type === 'html') {
            this.content.content = this.sanitizer.bypassSecurityTrustHtml(
                this.content.content as any,
            ) as any;
        } else if (this.content?.type === 'pipe') {
            this.renderPipe();
        } else if (this.content?.type === 'component') {
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
        return (this.content.content as any)(this.parent, this.context);
    }

    // Render pipe
    renderPipe() {
        const d = this.injector.get(this.content.extra.pipe) as PipeTransform;
    }
}
