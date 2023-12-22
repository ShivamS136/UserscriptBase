import { expect, test } from 'vitest';
import multiply from '../../../lib/multiply/multiply';

test('multiply', () => {
  expect(multiply(2, 2)).toBe(4);
  expect(multiply(5, 7)).toBe(35);
  expect(multiply(2, 0)).toBe(0);
});
