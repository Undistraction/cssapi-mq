module.exports = {
  modulePaths: [`<rootDir>/src/__tests__`],
  bail: true,
  verbose: false,
  collectCoverage: false,
  collectCoverageFrom: [`src/**/*.js`],
  coveragePathIgnorePatterns: [`src/index.js`],
  coverageReporters: [`lcov`, `html`],
  setupFiles: [],
  modulePathIgnorePatterns: [`helpers/`, `testHelpers/`, `sharedTests/`],
  setupTestFrameworkScriptFile: `<rootDir>/src/__tests__/testHelpers/matchers/customMatchers.js`,
  unmockedModulePathPatterns: [`jasmine-expect`],
  // reporters: [
  //   [
  //     `jest-slow-test-reporter`,
  //     { numTests: 8, warnOnSlowerThan: 300, color: true },
  //   ],
  // ],
}
