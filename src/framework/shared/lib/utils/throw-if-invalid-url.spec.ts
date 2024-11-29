import { throwIfInvalidUrl } from './throw-if-invalid-url';

describe('throwIfInvalidUrl unit test', () => {
  it('should not throw an error for a valid URL', () => {
    const validUrls = [
      'http://localhost:3000',
      'https://example.com',
      'http://127.0.0.1:5173',
      'https://sub.domain.example.com',
    ];

    for (const url of validUrls) {
      expect(() => throwIfInvalidUrl(url)).not.toThrow();
    }
  });

  it('should throw an error for an invalid URL', () => {
    const invalidUrls = [
      'invalid-url',
      'http//missing-colon.com',
      '://missing-protocol.com',
      'ftp://unsupported-protocol.com',
    ];

    for (const url of invalidUrls) {
      expect(() => throwIfInvalidUrl(url)).toThrow(
        `Invalid origin detected: ${url}`,
      );
    }
  });

  it('should throw an error for an empty string', () => {
    expect(() => throwIfInvalidUrl('')).toThrow('Invalid origin detected: ');
  });

  it('should handle edge cases gracefully', () => {
    const edgeCases = [
      null,
      undefined,
      ' ',
      'http://', // only scheme
    ];

    for (const edgeCase of edgeCases) {
      expect(() => throwIfInvalidUrl(edgeCase as string)).toThrow();
    }
  });
});
