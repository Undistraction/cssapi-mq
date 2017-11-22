import camelcase from 'camelcase';
import runTests from './runTests';

export default (name, { perMethodTests = [] } = {}) => {
  const camelisedName = camelcase(name);
  describe(`${name}`, () => {
    describe('range features', () => {
      // Define accessor names
      const valueMethod = camelisedName;
      const minValueMethod = camelcase('min', name);
      const maxValueMethod = camelcase('max', name);

      describe(`${valueMethod}()`, () => {
        runTests(perMethodTests.value, camelisedName, valueMethod);
      });

      describe(`${minValueMethod}()`, () => {
        runTests(perMethodTests.minValue, camelisedName, minValueMethod);
      });

      describe(`${maxValueMethod}()`, () => {
        runTests(perMethodTests.maxValue, camelisedName, maxValueMethod);
      });
    });
  });
};
