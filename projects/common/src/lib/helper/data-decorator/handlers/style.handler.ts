import { ElementRef } from '@angular/core';
import { DecoratorHandler, StyleData } from '../model';

export class StyleHandler implements DecoratorHandler {
    handle = 'style';

    handler = (component: ElementRef<HTMLElement>, data: StyleData) => {
        if (data.class) {
            component.nativeElement.classList.add(...data.class);
        }

        if (data.style) {
            Object.entries(data.style).forEach(([k, v]) => {
                component.nativeElement.style[k] = v;
            });
        }
    };
}
