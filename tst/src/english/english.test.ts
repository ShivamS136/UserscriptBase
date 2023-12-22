import { expect, test } from 'vitest';
import { isVowel } from '../../../src/english/english';

test('isVowel', () => {
  expect(isVowel('a')).toBe(true);
  expect(isVowel('b')).toBe(false);
});
