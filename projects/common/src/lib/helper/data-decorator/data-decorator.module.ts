import {
    InjectionToken,
    ModuleWithProviders,
    NgModule,
    Type,
} from '@angular/core';

import { DecoratorsDirective } from './data-decorator.directive';
import { GetDecoratorDataPipe } from './data-decorator.pipe';
import { StyleHandler } from './handlers/style.handler';
import { DATA_DECORATOR_HANDLER, DecoratorHandler } from './model';

@NgModule({
    imports: [],
    declarations: [DecoratorsDirective, GetDecoratorDataPipe],
    exports: [DecoratorsDirective, GetDecoratorDataPipe],
    providers: [
        {
            provide: DATA_DECORATOR_HANDLER,
            useClass: StyleHandler,
            multi: true,
        },
    ],
})
export class DataDecoratorModule {}
