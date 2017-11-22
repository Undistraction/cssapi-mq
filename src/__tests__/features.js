import { values } from 'ramda';
import camelcase from 'camelcase';

import {
  ORIENTATION,
  SCAN,
  GRID,
  UPDATE,
  OVERFLOW_BLOCK,
  OVERFLOW_INLINE,
  COLOR_GAMUT,
  DISPLAY_MODE,
} from '../const';
import {
  configSeparatesValuesWhenSet,
  configOutputsConfiguredDimensionUnits,
} from './sharedTests/config';
import {
  featureThrowsForMissingBreakpointSet,
  featureReturnsCorrectValueForBreakpoint,
  featureThrowsForMissingArgument,
  featureReturnsCorrectValueForValidExpicitValue,
  featureThrowsForInvalidExplicitBreakpoint,
  featureReturnsCorrectValueNoArguments,
  featureThrowsForInvalidBreakpoint,
} from './sharedTests/features';
import { mqWithValidBreakpointsForRange, genericInvalidValues } from './data';
import testRangedFeature from './helpers/testRangedFeature';
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

testLinearFeature('orientation', ORIENTATION);
testLinearFeature('scan', SCAN);
testLinearFeature('grid', GRID, { allowNoArgument: true });
testLinearFeature('update', UPDATE, { allowNoArgument: true });
testLinearFeature('overflow-block', OVERFLOW_BLOCK);
testLinearFeature('overflow-inline', OVERFLOW_INLINE);
testLinearFeature('color-gamut', COLOR_GAMUT);
testLinearFeature('display-mode', DISPLAY_MODE);

// Range
testRangedFeature('width', {
  tests: {
    value: [
      featureThrowsForMissingBreakpointSet,
      featureThrowsForInvalidBreakpoint,
      featureReturnsCorrectValueForBreakpoint,
      configSeparatesValuesWhenSet,
      configOutputsConfiguredDimensionUnits,
      featureThrowsForMissingArgument,
      featureReturnsCorrectValueForValidExpicitValue,
      featureThrowsForInvalidExplicitBreakpoint,
    ],
    minValue: [
      featureThrowsForMissingBreakpointSet,
      featureThrowsForInvalidBreakpoint,
      featureReturnsCorrectValueForBreakpoint,
      configSeparatesValuesWhenSet,
      configOutputsConfiguredDimensionUnits,
      featureThrowsForMissingArgument,
      featureReturnsCorrectValueForValidExpicitValue,
      featureThrowsForInvalidExplicitBreakpoint,
    ],
    maxValue: [
      featureThrowsForMissingBreakpointSet,
      featureThrowsForInvalidBreakpoint,
      featureReturnsCorrectValueForBreakpoint,
      configSeparatesValuesWhenSet,
      configOutputsConfiguredDimensionUnits,
      featureThrowsForMissingArgument,
      featureReturnsCorrectValueForValidExpicitValue,
      featureThrowsForInvalidExplicitBreakpoint,
    ],
  },
  invalidNonExplicitValues: [
    'xxxx',
    0,
    78,
    4999,
    '0px',
    '163px',
    '-555px',
    ...genericInvalidValues,
  ],
  invalidExplicitValues: ['xxxx', null, undefined],
  validExplicitValues: [0, 78, 4999, '0px', '163px', '-555px'],
});
testRangedFeature('height', {
  tests: {
    value: [
      featureThrowsForMissingBreakpointSet,
      featureThrowsForInvalidBreakpoint,
      featureReturnsCorrectValueForBreakpoint,
      configSeparatesValuesWhenSet,
      configOutputsConfiguredDimensionUnits,
      featureThrowsForMissingArgument,
      featureReturnsCorrectValueForValidExpicitValue,
      featureThrowsForInvalidExplicitBreakpoint,
    ],
    minValue: [
      featureThrowsForMissingBreakpointSet,
      featureThrowsForInvalidBreakpoint,
      featureReturnsCorrectValueForBreakpoint,
      configSeparatesValuesWhenSet,
      configOutputsConfiguredDimensionUnits,
      featureThrowsForMissingArgument,
      featureReturnsCorrectValueForValidExpicitValue,
      featureThrowsForInvalidExplicitBreakpoint,
    ],
    maxValue: [
      featureThrowsForMissingBreakpointSet,
      featureThrowsForInvalidBreakpoint,
      featureReturnsCorrectValueForBreakpoint,
      configSeparatesValuesWhenSet,
      configOutputsConfiguredDimensionUnits,
      featureThrowsForMissingArgument,
      featureReturnsCorrectValueForValidExpicitValue,
      featureThrowsForInvalidExplicitBreakpoint,
    ],
  },
  invalidNonExplicitValues: [
    'xxxx',
    0,
    78,
    4999,
    '0px',
    '163px',
    '-555px',
    ...genericInvalidValues,
  ],
  invalidExplicitValues: ['xxxx', null, undefined],
  validExplicitValues: [0, 78, 4999, '0px', '163px', '-555px'],
});
testRangedFeature('resolution', {
  tests: {
    value: [
      featureThrowsForMissingBreakpointSet,
      featureReturnsCorrectValueForBreakpoint,
      configSeparatesValuesWhenSet,
      featureThrowsForMissingArgument,
      featureReturnsCorrectValueForValidExpicitValue,
      featureThrowsForInvalidExplicitBreakpoint,
    ],
    minValue: [
      featureThrowsForMissingBreakpointSet,
      featureReturnsCorrectValueForBreakpoint,
      configSeparatesValuesWhenSet,
      featureThrowsForMissingArgument,
      featureReturnsCorrectValueForValidExpicitValue,
      featureThrowsForInvalidExplicitBreakpoint,
    ],
    maxValue: [
      featureThrowsForMissingBreakpointSet,
      featureReturnsCorrectValueForBreakpoint,
      configSeparatesValuesWhenSet,
      featureThrowsForMissingArgument,
      featureReturnsCorrectValueForValidExpicitValue,
      featureThrowsForInvalidExplicitBreakpoint,
    ],
  },
  invalidNonExplicitValues: [
    'xxxx',
    0,
    78,
    4999,
    '0dpi',
    '163dpi',
    '-555dpi',
    ...genericInvalidValues,
  ],
  invalidExplicitValues: ['xxxx', null, undefined],
  validExplicitValues: [0, 78, 4999, '0dpi', '163dpi', '-555dpi'],
});
testRangedFeature('aspect-ratio', {
  tests: {
    value: [
      featureThrowsForMissingBreakpointSet,
      featureReturnsCorrectValueForBreakpoint,
      featureThrowsForMissingArgument,
    ],
    minValue: [
      featureThrowsForMissingBreakpointSet,
      featureReturnsCorrectValueForBreakpoint,
      featureThrowsForMissingArgument,
    ],
    maxValue: [
      featureThrowsForMissingBreakpointSet,
      featureReturnsCorrectValueForBreakpoint,
      featureThrowsForMissingArgument,
    ],
  },
});
testRangedFeature('color', {
  tests: {
    value: [
      featureThrowsForMissingBreakpointSet,
      featureReturnsCorrectValueForBreakpoint,
      featureReturnsCorrectValueNoArguments,
    ],
    minValue: [
      featureThrowsForMissingBreakpointSet,
      featureReturnsCorrectValueForBreakpoint,
      featureThrowsForMissingArgument,
    ],
    maxValue: [
      featureThrowsForMissingBreakpointSet,
      featureReturnsCorrectValueForBreakpoint,
      featureThrowsForMissingArgument,
    ],
  },
});
testRangedFeature('color-index', {
  tests: {
    value: [
      featureThrowsForMissingBreakpointSet,
      featureReturnsCorrectValueForBreakpoint,
      featureReturnsCorrectValueNoArguments,
    ],
    minValue: [
      featureThrowsForMissingBreakpointSet,
      featureReturnsCorrectValueForBreakpoint,
      featureThrowsForMissingArgument,
    ],
    maxValue: [
      featureThrowsForMissingBreakpointSet,
      featureReturnsCorrectValueForBreakpoint,
      featureThrowsForMissingArgument,
    ],
  },
});
testRangedFeature('monochrome', {
  tests: {
    value: [
      featureThrowsForMissingBreakpointSet,
      featureReturnsCorrectValueForBreakpoint,
      featureReturnsCorrectValueNoArguments,
    ],
    minValue: [
      featureThrowsForMissingBreakpointSet,
      featureReturnsCorrectValueForBreakpoint,
      featureThrowsForMissingArgument,
    ],
    maxValue: [
      featureThrowsForMissingBreakpointSet,
      featureReturnsCorrectValueForBreakpoint,
      featureThrowsForMissingArgument,
    ],
  },
});
