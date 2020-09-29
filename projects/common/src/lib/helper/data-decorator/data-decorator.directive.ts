import { Directive, ElementRef, Inject, Input } from '@angular/core';
import { DATA_DECORATOR_HANDLER, DecoratorHandler, Decorators } from './model';

@Directive({
    selector: '[autoFormDecorator]',
})
export class DecoratorsDirective {
    @Input() autoFormElementID: string;

    constructor(
        @Inject(DATA_DECORATOR_HANDLER) private handlers: DecoratorHandler[],
        private elementRef: ElementRef<HTMLElement>,
    ) {}

    @Input() set autoFormDecorator(decorators: Decorators) {
        console.log('GOT HANDLERS', this.handlers);
        if (!decorators) {
            return;
        }
        for (const handler of this.handlers) {
            const type = handler.handle;
            if (decorators[type] && this.autoFormElementID) {
                handler.handler(
                    this.elementRef,
                    decorators[type][this.autoFormElementID],
                );
            }
        }

        /*
        if (this.autoFormElementID && decorator[this.autoFormElementID]) {
            decorator = decorator[this.autoFormElementID];
        }
        if (decorator?.class) {
            this.elementRef.nativeElement.classList.add(...decorator.class);
        }
        if (decorator?.style) {
            console.log(Object.entries(decorator.style));
            Object.entries(decorator.style).forEach(([k, v]) => {
                this.elementRef.nativeElement.style[k] = v;
            });
        }
        */
    }
}
