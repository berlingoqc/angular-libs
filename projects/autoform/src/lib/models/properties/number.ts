import { InputProperty } from './input';

export interface NumberProperty extends InputProperty {
  min?: number;
  max?: number;
  step?: number;
  maxDigit?: number;
  allowDecimal?: boolean;
}
