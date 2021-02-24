import { AbstractControl, ValidatorFn } from '@angular/forms';
import { TemplateContentData } from '@berlingoqc/ngx-common';
import { DataTransformerImpl } from '../../helper/data-transformer/data-transformer';
import { PropertyComponent } from '../component';
import { Container, ContainerData } from '../container';
import { Input } from '../properties';

export class MultiInputMatInput implements PropertyComponent, Container {
    container?: ContainerData;
    name = 'multi-part-input';

    spacers?: TemplateContentData | TemplateContentData[];
    // Descrit l'object a ramasser
    objects: { [id: string]: Input };

    transformer: DataTransformerImpl<string, any>;

    validators?: ValidatorFn[];
}
