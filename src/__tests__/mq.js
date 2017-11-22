import { values } from 'ramda';
import camelcase from 'camelcase';
import './helpers/toEqualCSS';
import styledMQ from '../mq';
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
  mqWithValidBreakpointsForRange,
  validBreakpointsForRange,
} from './data';
import {
  configSeparatesValuesWhenSet,
  configOutputsConfiguredDimensionUnits,
} from './tests/config';
import {
  featureThrowsForMissingBreakpointSet,
  featureReturnsCorrectValueForBreakpoint,
  featureThrowsForMissingArgument,
  featureReturnsCorrectValueForValidExpicitValue,
  featureThrowsForInvalidExplicitBreakpoint,
  featureReturnsCorrectValueNoArguments,
  featureThrowsForInvalidBreakpoint,
} from './tests/features';
import {
  queryThrowsIfMissingBreakpoint,
  queryReturnsCorrectValueSingleBreakpoint,
  queryReturnsCorrectValueWithTwoBreakpoints,
  queryThrowsIfMissingEitherBreakpoint,
  queryThrowsWithBothBreakpointsTheSame,
} from './tests/queries';

import testRangedFeature from './helpers/testRangedFeature';
import testRangedQueries from './helpers/testRangedQueries';
import cssSerialiser from './helpers/cssSerialiser';

expect.addSnapshotSerializer(cssSerialiser);

// -----------------------------------------------------------------------------
// Internal
// -----------------------------------------------------------------------------

// -----------------------------------------------------------------------------
// Shared Tests
// -----------------------------------------------------------------------------

// -----------------------------------------------------------------------------
// Test Types
// -----------------------------------------------------------------------------

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

// -----------------------------------------------------------------------------
// Configuration
// -----------------------------------------------------------------------------

describe('configuration', () => {
  it('throws if no breakpoints are supplied', () => {
    expect(() => styledMQ.configure()).toThrowErrorMatchingSnapshot();
  });

  it('throws if no breakpoint sets are supplied', () => {
    expect(() => styledMQ.configure({})).toThrowErrorMatchingSnapshot();
  });

  it('throws if invalid breakpoint value is supplied', () => {
    expect(() =>
      styledMQ.configure({ width: { small: 'xxx' } })
    ).toThrowErrorMatchingSnapshot();
  });

  it("doesn't throw an error with default configuration", () => {
    expect(() => mqWithValidBreakpointsForRange('width').not.toThrow());
  });

  describe('config object', () => {
    describe('baseFontSize', () => {
      it("adjusts values based on 'basefontSize'", () => {
        const result = styledMQ
          .configure(validBreakpointsForRange('width'), { baseFontSize: 10 })
          .belowWidth('small')`
          background-color: ${() => 'GhostWhite'};
        `;
        expect(result).toMatchSnapshot();
      });

      it("throws if 'baseFontSize' is not a positive number", () => {
        const config = { baseFontSize: 'xxxx' };
        expect(() =>
          styledMQ.configure(validBreakpointsForRange('width'), config)
        ).toThrowErrorMatchingSnapshot();
      });

      it("doesn't throw an error if 'baseFontSize' is a positive number", () => {
        const config = { baseFontSize: 12 };
        expect(() =>
          styledMQ.configure(validBreakpointsForRange('width'), config)
        ).not.toThrow();
      });
    });

    describe('defaultMediaType', () => {
      it("throws if 'defaultMediaType' is not valid", () => {
        const config = { defaultMediaType: 'xxxx' };
        expect(() =>
          styledMQ.configure(validBreakpointsForRange('width'), config)
        ).toThrowErrorMatchingSnapshot();
      });

      it("doesn't throw an error if 'defaultMediaType' is valid", () => {
        expect(() =>
          styledMQ.configure(validBreakpointsForRange('width'), {
            defaultMediaType: 'all',
          })
        ).not.toThrow();
        expect(() =>
          styledMQ.configure(validBreakpointsForRange('width'), {
            defaultMediaType: '',
          })
        ).not.toThrow();
        expect(() =>
          styledMQ.configure(validBreakpointsForRange('width'), {
            defaultMediaType: ['screen', 'print'],
          })
        ).not.toThrow();
      });
    });

    describe('dimensionsUnit', () => {
      it("throws if 'dimensionsUnit' is not valid", () => {
        const config = { dimensionsUnit: 'xxxx' };
        expect(() =>
          styledMQ.configure(validBreakpointsForRange('width'), config)
        ).toThrowErrorMatchingSnapshot();
      });

      it("doesn't throw an error if 'dimensionsUnit' is valid", () => {
        const config = { dimensionsUnit: 'px' };
        expect(() =>
          styledMQ.configure(validBreakpointsForRange('width'), config)
        ).not.toThrow();
      });
    });

    describe('shouldSeparateQueries', () => {
      it("throws if 'shouldSeparateQueries' is not a boolean", () => {
        const config = { shouldSeparateQueries: 'xxxx' };
        expect(() =>
          styledMQ.configure(validBreakpointsForRange('width'), config)
        ).toThrowErrorMatchingSnapshot();
      });

      it("doesn't throw an error if 'shouldSeparateQueries' is a boolean", () => {
        const config = { shouldSeparateQueries: false };
        expect(() =>
          styledMQ.configure(validBreakpointsForRange('width'), config)
        ).not.toThrow();
      });
    });
  });
});

// -----------------------------------------------------------------------------
// Features
// -----------------------------------------------------------------------------

// Linear
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
    null,
    undefined,
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
    null,
    undefined,
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
    null,
    undefined,
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

// -----------------------------------------------------------------------------
// Features
// -----------------------------------------------------------------------------

testRangedQueries('width', {
  tests: {
    above: [
      queryThrowsIfMissingBreakpoint,
      queryReturnsCorrectValueSingleBreakpoint,
    ],
    below: [
      queryThrowsIfMissingBreakpoint,
      queryReturnsCorrectValueSingleBreakpoint,
    ],
    between: [
      queryReturnsCorrectValueWithTwoBreakpoints,
      queryThrowsIfMissingEitherBreakpoint,
      queryThrowsWithBothBreakpointsTheSame,
    ],
    at: [
      queryThrowsIfMissingBreakpoint,
      queryReturnsCorrectValueSingleBreakpoint,
    ],
    atBreakpoint: [
      queryThrowsIfMissingBreakpoint,
      queryReturnsCorrectValueSingleBreakpoint,
    ],
  },
});
testRangedQueries('height', {
  tests: {
    above: [
      queryThrowsIfMissingBreakpoint,
      queryReturnsCorrectValueSingleBreakpoint,
    ],
    below: [
      queryThrowsIfMissingBreakpoint,
      queryReturnsCorrectValueSingleBreakpoint,
    ],
    between: [
      queryReturnsCorrectValueWithTwoBreakpoints,
      queryThrowsIfMissingEitherBreakpoint,
      queryThrowsWithBothBreakpointsTheSame,
    ],
    at: [
      queryThrowsIfMissingBreakpoint,
      queryReturnsCorrectValueSingleBreakpoint,
    ],
    atBreakpoint: [
      queryThrowsIfMissingBreakpoint,
      queryReturnsCorrectValueSingleBreakpoint,
    ],
  },
});
testRangedQueries('resolution', {
  tests: {
    above: [
      queryThrowsIfMissingBreakpoint,
      queryReturnsCorrectValueSingleBreakpoint,
    ],
    below: [
      queryThrowsIfMissingBreakpoint,
      queryReturnsCorrectValueSingleBreakpoint,
    ],
    between: [
      queryReturnsCorrectValueWithTwoBreakpoints,
      queryThrowsIfMissingEitherBreakpoint,
      queryThrowsWithBothBreakpointsTheSame,
    ],
    at: [
      queryThrowsIfMissingBreakpoint,
      queryReturnsCorrectValueSingleBreakpoint,
    ],
    atBreakpoint: [
      queryThrowsIfMissingBreakpoint,
      queryReturnsCorrectValueSingleBreakpoint,
    ],
  },
});
testRangedQueries('aspect-ratio', {
  tests: {
    above: [
      queryThrowsIfMissingBreakpoint,
      queryReturnsCorrectValueSingleBreakpoint,
    ],
    below: [
      queryThrowsIfMissingBreakpoint,
      queryReturnsCorrectValueSingleBreakpoint,
    ],
    between: [
      queryReturnsCorrectValueWithTwoBreakpoints,
      queryThrowsIfMissingEitherBreakpoint,
      queryThrowsWithBothBreakpointsTheSame,
    ],
    at: [
      queryThrowsIfMissingBreakpoint,
      queryReturnsCorrectValueSingleBreakpoint,
    ],
    atBreakpoint: [
      queryThrowsIfMissingBreakpoint,
      queryReturnsCorrectValueSingleBreakpoint,
    ],
  },
});

testRangedQueries('color', {
  tests: {
    above: [
      queryThrowsIfMissingBreakpoint,
      queryReturnsCorrectValueSingleBreakpoint,
    ],
    below: [
      queryThrowsIfMissingBreakpoint,
      queryReturnsCorrectValueSingleBreakpoint,
    ],
    between: [
      queryReturnsCorrectValueWithTwoBreakpoints,
      queryThrowsIfMissingEitherBreakpoint,
      queryThrowsWithBothBreakpointsTheSame,
    ],
    at: [
      queryThrowsIfMissingBreakpoint,
      queryReturnsCorrectValueSingleBreakpoint,
    ],
    atBreakpoint: [
      queryThrowsIfMissingBreakpoint,
      queryReturnsCorrectValueSingleBreakpoint,
    ],
  },
});

testRangedQueries('color-index', {
  tests: {
    above: [
      queryThrowsIfMissingBreakpoint,
      queryReturnsCorrectValueSingleBreakpoint,
    ],
    below: [
      queryThrowsIfMissingBreakpoint,
      queryReturnsCorrectValueSingleBreakpoint,
    ],
    between: [
      queryReturnsCorrectValueWithTwoBreakpoints,
      queryThrowsIfMissingEitherBreakpoint,
      queryThrowsWithBothBreakpointsTheSame,
    ],
    at: [
      queryThrowsIfMissingBreakpoint,
      queryReturnsCorrectValueSingleBreakpoint,
    ],
    atBreakpoint: [
      queryThrowsIfMissingBreakpoint,
      queryReturnsCorrectValueSingleBreakpoint,
    ],
  },
});

testRangedQueries('monochrome', {
  tests: {
    above: [
      queryThrowsIfMissingBreakpoint,
      queryReturnsCorrectValueSingleBreakpoint,
    ],
    below: [
      queryThrowsIfMissingBreakpoint,
      queryReturnsCorrectValueSingleBreakpoint,
    ],
    between: [
      queryReturnsCorrectValueWithTwoBreakpoints,
      queryThrowsIfMissingEitherBreakpoint,
      queryThrowsWithBothBreakpointsTheSame,
    ],
    at: [
      queryThrowsIfMissingBreakpoint,
      queryReturnsCorrectValueSingleBreakpoint,
    ],
    atBreakpoint: [
      queryThrowsIfMissingBreakpoint,
      queryReturnsCorrectValueSingleBreakpoint,
    ],
  },
});
