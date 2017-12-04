module.exports = {
  bail: true,
  verbose: true,
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.js'],
  coveragePathIgnorePatterns: ['src/index.js'],
  coverageReporters: ['json'],
  setupFiles: [],
  modulePathIgnorePatterns: [
    'helpers/',
    'sharedTests/',
    'data.js',
    'featureValues.js',
  ],
};
