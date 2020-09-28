import { PropertyComponent } from '../component';

export class SlidderNumberComponent implements PropertyComponent {
  name = 'slidder';
  orientation?: string;
  tickInterval?: number;
  thumbLabel?: boolean;
  formatText?: (data: any) => string;
}
