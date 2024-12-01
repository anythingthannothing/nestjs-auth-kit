import type { Config } from 'jest';

export default (): Config => ({
  moduleFileExtensions: ['js'],
  rootDir: '.',
  testEnvironment: 'node',
  testRegex: '.e2e-spec.js',
  globalSetup: './setup.js',
  globalTeardown: './teardown.js',
});
