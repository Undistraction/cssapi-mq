import { reject, compose, toString, map, range, zipObj } from 'ramda';
import camelcase from 'camelcase';
import styledMQ from '../mq';
import cssSerialiser from './helpers/cssSerialiser';
import {
  mqWithValidBreakpointsForRange,
  validBreakpointsForRange,
  mqWithNoBreakpoints,
  invalidValues,
  genericStrings,
  genericValues,
  junkValues,
  genericNumbers,
  genericPositiveNumbers,
  positivePixelValues,
  negativePixelValuesOrZero,
} from './data';
import featureValues from './featureValues';
import { rangedFeatureNames } from '../features';

expect.addSnapshotSerializer(cssSerialiser);

const breakpointNames = compose(map(toString), range(1))(50);

const validBreakpointValuesForFeature = name => ({
  [name]: zipObj(
    breakpointNames,
    featureValues(camelcase(name)).validExplicitValues
  ),
});

describe('configure()', () => {
  it('throws if no breakpoints are supplied', () => {
    expect(() => styledMQ.configure()).toThrowErrorMatchingSnapshot();
  });

  it('throws if no breakpoint sets are supplied', () => {
    expect(() => styledMQ.configure({})).toThrowErrorMatchingSnapshot();
  });

  it("doesn't throw with default configuration", () => {
    expect(() => mqWithNoBreakpoints().not.toThrow());
  });

  describe('breakpoints', () => {
    for (const featureName of rangedFeatureNames) {
      it("doesn't throw if breakpoint set values are valid", () => {
        expect(() =>
          styledMQ.configure(validBreakpointValuesForFeature(featureName))
        ).not.toThrow();
      });
    }

    for (const featureName of rangedFeatureNames) {
      const invalidFeatureValues = featureValues(camelcase(featureName))
        .invalidExplicitValues;

      for (const invalidValue of invalidFeatureValues) {
        it(`throws if invalid '${
          featureName
        }' breakpoint set value is supplied of '${invalidValue}'`, () => {
          expect(() =>
            styledMQ.configure({ [featureName]: { a: invalidValue } })
          ).toThrowErrorMatchingSnapshot();
        });
      }
    }
  });

  describe('config object', () => {
    describe('baseFontSize', () => {
      it("adjusts values based on 'basefontSize' for width", () => {
        const result = mqWithValidBreakpointsForRange('width', {
          baseFontSize: 10,
        }).belowWidth('small')`
          background-color: ${() => 'GhostWhite'};
        `;
        expect(result).toMatchSnapshot();
      });

      it("adjusts values based on 'basefontSize' for height", () => {
        const result = mqWithValidBreakpointsForRange('height', {
          baseFontSize: 10,
        }).belowHeight('small')`
          background-color: ${() => 'GhostWhite'};
        `;
        expect(result).toMatchSnapshot();
      });

      const invalidBaseFontSizes = [
        ...invalidValues,
        ...negativePixelValuesOrZero,
      ];

      for (const value of invalidBaseFontSizes) {
        it(`throws if 'baseFontSize' is '${value}'`, () => {
          expect(() =>
            styledMQ.configure(validBreakpointsForRange('width'), {
              baseFontSize: value,
            })
          ).toThrowErrorMatchingSnapshot();
        });
      }

      const validBaseFontSizes = [
        ...genericPositiveNumbers,
        ...positivePixelValues,
      ];

      for (const value of validBaseFontSizes) {
        it(`doesn't throw an error if 'baseFontSize' is '${value}'`, () => {
          expect(() =>
            styledMQ.configure(validBreakpointsForRange('width'), {
              baseFontSize: value,
            })
          ).not.toThrow();
        });
      }
    });

    describe('defaultMediaType', () => {
      const invalidDefaultMediaTypes = reject(v => v === null, genericValues);
      for (const value of invalidDefaultMediaTypes) {
        it(`throws if 'defaultMediaType' is '${value}'`, () => {
          expect(() =>
            styledMQ.configure(validBreakpointsForRange('width'), {
              defaultMediaType: value,
            })
          ).toThrowErrorMatchingSnapshot();
        });
      }

      const validDefaultMediaTypes = ['screen', 'print', 'all', 'speech', null];
      for (const value of validDefaultMediaTypes) {
        it(`doesn't throw an error if 'defaultMediaType' is '${value}'`, () => {
          expect(() =>
            styledMQ.configure(validBreakpointsForRange('width'), {
              defaultMediaType: 'all',
            })
          ).not.toThrow();
        });
      }
    });

    describe('dimensionsUnit', () => {
      const invalidDimensionsUnits = [...invalidValues, ...genericStrings];
      for (const value of invalidDimensionsUnits) {
        it(`throws if 'dimensionsUnit' is '${value}'`, () => {
          const config = { dimensionsUnit: value };
          expect(() =>
            styledMQ.configure(validBreakpointsForRange('width'), config)
          ).toThrowErrorMatchingSnapshot();
        });
      }

      const validDimensionsUnits = ['em', 'rem', 'px'];
      for (const value of validDimensionsUnits) {
        it(`doesn't throw an error if 'dimensionsUnit' is '${value}'`, () => {
          const config = { dimensionsUnit: value };
          expect(() =>
            styledMQ.configure(validBreakpointsForRange('width'), config)
          ).not.toThrow();
        });
      }
    });

    describe('shouldSeparateQueries', () => {
      const invalidShouldSeparateQueriesValues = [
        ...junkValues,
        ...genericNumbers,
        genericStrings,
      ];

      for (const value of invalidShouldSeparateQueriesValues) {
        it(`throws if 'shouldSeparateQueries' is '${value}'`, () => {
          const config = { shouldSeparateQueries: value };
          expect(() =>
            styledMQ.configure(validBreakpointsForRange('width'), config)
          ).toThrowErrorMatchingSnapshot();
        });
      }

      const validShouldSeparateQueriesValues = [true, false];
      for (const value of validShouldSeparateQueriesValues) {
        it(`doesn't throw an error if 'shouldSeparateQueries' isn't  a '${
          value
        }'`, () => {
          const config = { shouldSeparateQueries: value };
          expect(() =>
            styledMQ.configure(validBreakpointsForRange('width'), config)
          ).not.toThrow();
        });
      }
    });
  });
});
