import { randomInt } from 'crypto';

export const defaultCharSet =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

export const generateRandomString = (
  length: number,
  charSet: string = defaultCharSet,
): string => {
  if (length <= 0) {
    throw new Error('Length must be a positive number.');
  }
  if (charSet.length === 0) {
    throw new Error('Character set must not be empty.');
  }

  return Array.from(
    { length },
    () => charSet[randomInt(0, charSet.length)],
  ).join('');
};
