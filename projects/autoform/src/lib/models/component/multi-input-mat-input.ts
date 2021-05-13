import { AbstractControl, ValidatorFn } from '@angular/forms';
import { TemplateContentData, DataTransformerImpl } from '@berlingoqc/ngx-common';
import { PropertyComponent } from '../component';
import { Container, ContainerData } from '../container';
import { Input } from '../properties';
import { Validator } from '../properties/validator';

export class MultiInputMatInput implements PropertyComponent, Container {
    container?: ContainerData;
    name = 'multi-part-input';

    spacers?: TemplateContentData | TemplateContentData[];
    // Descrit l'object a ramasser
    objects: { [id: string]: Input & Validator };

    transformer: DataTransformerImpl<string, any>;

    validators?: ValidatorFn[];
}
