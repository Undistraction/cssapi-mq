import camelcase from 'camelcase';
import runTests from './runTests';

export default (
  name,
  {
    tests = [],
    validExplicitValues = [],
    invalidNonExplicitValues = [],
    invalidExplicitValues = [],
    allowNoArgument = false,
  } = {}
) => {
  const camelisedName = camelcase(name);
  describe.only(`${name}`, () => {
    describe('range features', () => {
      // Define accessor names
      const valueMethod = camelisedName;
      const minValueMethod = camelcase('min', name);
      const maxValueMethod = camelcase('max', name);

      describe(`${valueMethod}()`, () => {
        runTests(tests.value, camelisedName, valueMethod, {
          invalidNonExplicitValues,
          invalidExplicitValues,
          validExplicitValues,
          allowNoArgument,
        });
      });

      describe(`${minValueMethod}()`, () => {
        runTests(tests.minValue, camelisedName, minValueMethod, {
          invalidNonExplicitValues,
          invalidExplicitValues,
          validExplicitValues,
        });
      });

      describe(`${maxValueMethod}()`, () => {
        runTests(tests.maxValue, camelisedName, maxValueMethod, {
          invalidNonExplicitValues,
          invalidExplicitValues,
          validExplicitValues,
        });
      });
    });
  });
};
