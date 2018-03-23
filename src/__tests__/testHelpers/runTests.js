export default (tests, name, method, config) => {
  for (const test of tests) {
    test(name, method, config);
  }
};
