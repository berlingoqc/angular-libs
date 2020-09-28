import { TemplateContentData } from '../../helper';
import { PropertyComponent } from '../component';

// Une option a selectionner dans la mat-select
export interface SelectOption {
  // La valeur de cette options
  value: any;
  // La facon de la display
  display: TemplateContentData;
}

export class SelectOptionGroup {
  display: TemplateContentData;
  options: SelectOption[];
}

export interface SelectOptionGroups {
  [id: string]: SelectOptionGroup;
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

  // Les options du mat-select
  options: SelectOption[] | SelectOptionGroups;
}
