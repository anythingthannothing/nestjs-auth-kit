import type { Config } from 'jest';

export default (): Config => ({
  moduleFileExtensions: ['js'],
  rootDir: '../../test-dist',
  testRegex: '.*\\.spec\\.js$',
  collectCoverageFrom: ['**/*.(t|j)s'],
  coverageDirectory: '../../coverage',
  testEnvironment: 'node',
  globalSetup: './test/unit/setup.js',
  globalTeardown: './test/unit/teardown.js',
});
