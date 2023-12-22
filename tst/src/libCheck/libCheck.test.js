import { expect, test } from 'vitest';
import { mulBy2 } from '../../../src/libCheck/libCheck';

test('mulBy2', () => {
  expect(mulBy2(0)).toBe(0);
  expect(mulBy2(3)).toBe(6);
});
