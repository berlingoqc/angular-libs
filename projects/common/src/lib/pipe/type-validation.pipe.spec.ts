import { InstanceOfPipe, TypeValidationPipe } from './type-validation.pipe';
import { assert } from 'console';

describe('Type validation pipe', () => {
  it('Valide instance', () => {
    const d = new InstanceOfPipe();

    const dd = new TypeValidationPipe();

    expect(d.transform(dd, InstanceOfPipe)).toBe(false);
    expect(d.transform(dd, TypeValidationPipe)).toBe(true);
  });

  it('Valide type', () => {
    const type = new TypeValidationPipe();
    expect(type.transform(3, 'number')).toBe(true);
    expect(type.transform('dsa', 'number')).toBe(false);
    expect(type.transform(() => {}, 'function')).toBe(true);
    expect(type.transform({}, 'object')).toBe(true);
  });
});
