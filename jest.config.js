module.exports = {
  bail: true,
  verbose: false,
  collectCoverage: false,
  collectCoverageFrom: [`src/**/*.js`],
  coveragePathIgnorePatterns: [`src/index.js`],
  coverageReporters: [`json`],
  setupFiles: [],
  modulePathIgnorePatterns: [`helpers/`, `testHelpers/`, `sharedTests/`],
  setupTestFrameworkScriptFile: `<rootDir>/src/__tests__/testHelpers/matchers/customMatchers.js`,
  unmockedModulePathPatterns: [`jasmine-expect`],
}
