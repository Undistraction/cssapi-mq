module.exports = {
  bail: true,
  verbose: true,
  collectCoverage: true,
  collectCoverageFrom: [`src/**/*.js`],
  coveragePathIgnorePatterns: [`src/index.js`],
  coverageReporters: [`json`],
  setupFiles: [],
  modulePathIgnorePatterns: [`helpers/`, `testHelpers/`, `sharedTests/`],
  setupTestFrameworkScriptFile: `<rootDir>/src/__tests__/testHelpers/matchers/customMatchers.js`,
  unmockedModulePathPatterns: [`jasmine-expect`],
}
