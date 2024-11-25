import { defaultCharSet, generateRandomString } from './generate-random-string';

describe('generateRandomString unit test', () => {
  test('generates a string of the specified length', () => {
    const length = 10;
    const result = generateRandomString(length);
    expect(result).toHaveLength(length);
  });

  test('uses the default character set when charSet is not provided', () => {
    const length = 15;
    const result = generateRandomString(length);
    expect(result).toMatch(new RegExp(`^[${defaultCharSet}]+$`));
  });

  test('uses the provided character set to generate the string', () => {
    const length = 8;
    const charSet = 'ABC';
    const result = generateRandomString(length, charSet);
    expect(result).toHaveLength(length);
    expect(result).toMatch(/^[ABC]+$/);
  });

  test('throws an error when length is less than or equal to 0', () => {
    expect(() => generateRandomString(0)).toThrow(
      'Length must be a positive number.',
    );
    expect(() => generateRandomString(-5)).toThrow(
      'Length must be a positive number.',
    );
  });

  test('throws an error when charSet is empty', () => {
    expect(() => generateRandomString(5, '')).toThrow(
      'Character set must not be empty.',
    );
  });

  test('generates different results for successive calls', () => {
    const length = 12;
    const result1 = generateRandomString(length);
    const result2 = generateRandomString(length);
    expect(result1).not.toBe(result2);
  });
});
