import { InjectionToken } from '@angular/core';

export interface StyleData {
    style?: any;
    class?: string[];
}

export type DecoratorsData = { [id: string]: { [id: string]: any } };

export interface Decorators {
    // first key is for the handler and second is your the element to apply it on
    decorators?: DecoratorsData;
}

export interface DecoratorHandler {
    handle: string;
    handler: (component: any, v: any) => any;
}

export const DATA_DECORATOR_HANDLER = new InjectionToken<DecoratorHandler>(
    'decorator.handler',
);
