/**
 * Doit supporter les types de bool suivants:
 * * checkbox
 * * toggle
 * *
 */

import { IProperty } from './iproperty';

export interface BoolProperty extends IProperty {
    labelPosition?: 'before' | 'after';
}
