module.exports = {
  bail: true,
  verbose: true,
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.js'],
  coveragePathIgnorePatterns: ['src/index.js'],
  setupFiles: [],
  modulePathIgnorePatterns: [
    'helpers/',
    'sharedTests/',
    'data.js',
    'featureValues.js',
  ],
};
