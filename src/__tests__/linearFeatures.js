import { values } from 'ramda';
import camelcase from 'camelcase';
import { LINEAR_FEATURES } from '../features';

import { mqWithValidBreakpointsForRange } from './data';
import cssSerialiser from './helpers/cssSerialiser';

expect.addSnapshotSerializer(cssSerialiser);

const testLinearFeature = (
  name,
  validValuesMap,
  { allowNoArgument = false } = {}
) => {
  const validValues = values(validValuesMap);
  const methodName = camelcase(name);
  describe(`${methodName}()`, () => {
    describe('linear feature', () => {
      if (allowNoArgument) {
        it("doesn't throw if no argument is supplied", () => {
          expect(() =>
            mqWithValidBreakpointsForRange('width')[methodName]()
          ).not.toThrow();
        });

        it(`returns a valueless ${name}`, () => {
          expect(
            mqWithValidBreakpointsForRange('width')[methodName]()
          ).toMatchSnapshot();
        });
      } else {
        it('throws if no argument is supplied', () => {
          expect(() =>
            mqWithValidBreakpointsForRange('width')[methodName]()
          ).toThrowErrorMatchingSnapshot();
        });
      }

      it('throws if argument is not valid value', () => {
        expect(() =>
          mqWithValidBreakpointsForRange('width')[methodName]('xxxx')
        ).toThrowErrorMatchingSnapshot();
      });
      for (const value of validValues) {
        it(`returns the supplied ${name} for '${value}'`, () => {
          expect(
            mqWithValidBreakpointsForRange('width')[methodName](value)
          ).toMatchSnapshot();
        });
      }
    });
  });
};

for (const feature of LINEAR_FEATURES) {
  const { name, validValues, allowNoArgument } = feature;
  testLinearFeature(name, validValues, { allowNoArgument });
}
