import { DataResolver, TemplateContentData } from '@berlingoqc/ngx-common';
import { PropertyComponent } from '../component';


export class SelectOptionGroup {
    displayTitle: TemplateContentData;
    displayContent: TemplateContentData;
    value: DataResolver<any[]>;
}

export class SelectComponent implements PropertyComponent {
    name: 'select';

    // Si on display le menu select nativement ou lui de angular material
    type?: 'mat' | 'native';

    // Si on peut sélectionner de multiple value
    multiple?: boolean;

    // disableRipple animation
    disableRipple?: boolean;

    // La classe du panel ouvert par le mat-select
    panelClass?: string;

    // noneOption, si on affiche une options null
    noneOption?: TemplateContentData;

    // compareFunction
    compareWith?: (object1: any, object2: any) => boolean;

    // Les options du mat-select
    options: SelectOptionGroup;
}
