import { checkIsApp } from './check-is-app';

describe('checkIsApp unit test', () => {
  it('should return true for valid app platforms (ios, android)', () => {
    expect(checkIsApp('ios')).toBe(true);
    expect(checkIsApp('android')).toBe(true);
  });

  it('should return false for the web platform', () => {
    expect(checkIsApp('web')).toBe(false);
  });

  it('should throw an error for invalid platforms', () => {
    const invalidPlatforms = [
      'desktop',
      'windows',
      '',
      'macos',
      'qjkwleasdnl',
      1,
      [],
      {},
      undefined,
    ] as any[];

    invalidPlatforms.forEach((platform) => {
      expect(() => checkIsApp(platform)).toThrow('Invalid platform value');
    });
  });
});
