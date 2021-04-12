import { Injector } from '@angular/core';

export let injector: Injector;

export const setInjector = (inj: Injector) => {
    injector = inj;
};
