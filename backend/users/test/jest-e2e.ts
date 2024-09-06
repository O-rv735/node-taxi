import { pathsToModuleNameMapper, JestConfigWithTsJest } from 'ts-jest';

const config: JestConfigWithTsJest = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: '../',
  testEnvironment: 'node',
  testRegex: '.e2e-spec.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  moduleNameMapper: pathsToModuleNameMapper(
    {
      'src/*': ['src/*'],
    },
    {
      prefix: '<rootDir>',
    },
  ),
  modulePathIgnorePatterns: ['dist'],
};

export default config;
