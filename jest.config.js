export default {
  testEnvironment: 'node',
  // detectLeaks: true,
  detectOpenHandles: true,
  preset: 'ts-jest/presets/default-esm',
  transform: {
    '^src/.+\\.m?[tj]s?$': ['ts-jest', { useESM: true }]
  },
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.(m)?js$': '$1'
  },
  testRegex: '/__tests__/.*((\\.|/)(test|spec))\\.(m)?ts$',

  coverageDirectory: '<rootDir>/coverage',
  coverageReporters: ['json', 'lcov', 'text', 'clover', 'cobertura'],
  collectCoverageFrom: ['src/**/*.ts', '!**/*.d.ts', '!**/*.d.mts'],
  reporters: [
    'default',
    [
      'jest-junit',
      {
        outputDirectory: 'test',
        outputName: 'junit.xml'
      }
    ]
  ]
}
