import {
  values,
  drop,
  keys,
  compose,
  sequence,
  of,
  flip,
  repeat,
  filter,
} from 'ramda';
import camelcase from 'camelcase';
import './helpers/toEqualCSS';
import styledMQ from '../mq';
import { InvalidValueError } from '../errors';
import {
  MEDIA_TYPES,
  ORIENTATION,
  SCAN,
  GRID,
  UPDATE,
  OVERFLOW_BLOCK,
  OVERFLOW_INLINE,
  COLOR_GAMUT,
  DISPLAY_MODE,
} from '../const';

// Register serializer for use by Jest in generating snapshots. Without a serializer the snapshots are difficult to read.
import cssSerialiser from './helpers/cssSerialiser';

expect.addSnapshotSerializer(cssSerialiser);

const permutations = compose(sequence(of), flip(repeat));
const filterIfPairSame = filter(pair => pair[0] !== pair[1]);
const pluralise = value => `${value}s`;

const validDimensionBreakpoints = {
  small: 400,
  medium: 900,
  large: 1100,
  xLarge: 1300,
};

const validResolutionBreakpoints = {
  small: 72,
  medium: 150,
  large: 300,
  xLarge: 600,
};

const validAspectRatioBreakpoints = {
  small: '2/3',
  medium: '1/1',
  large: '3/2',
  xLarge: '16/9',
};

const colorBreakpoints = {
  small: 1,
  medium: 4,
  large: 5,
  xLarge: 6,
};

const monochromeBreakpoints = {
  small: 0,
  medium: 4,
  large: 8,
  xLarge: 16,
};

const validBreakpoints = {
  width: validDimensionBreakpoints,
  height: validDimensionBreakpoints,
  resolution: validResolutionBreakpoints,
  aspectRatio: validAspectRatioBreakpoints,
  color: colorBreakpoints,
  colorIndex: colorBreakpoints,
  monochrome: monochromeBreakpoints,
};

// -----------------------------------------------------------------------------
// Internal
// -----------------------------------------------------------------------------

const runPerMethodTestsForFeature = (tests, name, method) => {
  for (const test of tests) {
    test(name, method);
  }
};

const validBreakpointsForRange = name => {
  const camelisedName = camelcase(name);
  const o = {};
  o[camelisedName] = validBreakpoints[camelisedName];
  return o;
};

const mqWithValidBreakpointsForRange = (name, config = {}) =>
  styledMQ.configure(validBreakpointsForRange(name), config);

const validBreakpointKeysForRange = name => {
  const camelisedName = camelcase(name);
  return keys(validBreakpointsForRange(name)[camelisedName]);
};

const mqWithTweakedBreakpointsForRange = name =>
  styledMQ
    .configure(validBreakpointsForRange(name))
    .tweak({ width: { alpha: 300 } });

const mqWithNoBreakpoints = () => styledMQ.configure({});

// -----------------------------------------------------------------------------
// Shared Tests
// -----------------------------------------------------------------------------

const testConfigurableUnits = (name, method) => {
  it('renders configured dimensionsUnits', () => {
    expect(
      mqWithValidBreakpointsForRange(name, { dimensionsUnit: 'rem' })[method](
        'small'
      )
    ).toMatchSnapshot();

    expect(
      mqWithValidBreakpointsForRange(name, { dimensionsUnit: 'px' })[method](
        'small'
      )
    ).toMatchSnapshot();
  });
};

const testConfigurableSeparation = (name, method) => {
  it("doesn't separate dimensionsUnits if not configured", () => {
    expect(
      mqWithValidBreakpointsForRange(name, { shouldSeparateQueries: false })[
        method
      ]('small')
    ).toMatchSnapshot();
  });
};

const featureThrowsForMissingBreakpoint = (name, method) => {
  it("throws if breakpoint doesn't exist", () => {
    expect(() =>
      mqWithValidBreakpointsForRange(name)[method]('xxxx')
    ).toThrowErrorMatchingSnapshot();
  });
};

const featureThrowsForMissingBreakpointSet = (name, method) => {
  it(`throws if ${name} breakpoint map doesn't exist`, () => {
    expect(() =>
      mqWithNoBreakpoints()[method]('xxxx')
    ).toThrowErrorMatchingSnapshot();
  });
};

const featureReturnsCorrectValue = (name, method) => {
  it('returns the correct media fragment', () => {
    expect(
      mqWithValidBreakpointsForRange(name)[method]('small')
    ).toMatchSnapshot();
  });
};

const queryThrowsIfMissingBreakpoint = (name, method) => {
  it("throws if breakpoint doesn't exist", () => {
    expect(
      () => mqWithValidBreakpointsForRange(name)[method]('xxxx')``
    ).toThrowErrorMatchingSnapshot();
  });
};

const queryReturnsCorrectValueSingleBreakpoint = (name, method) => {
  for (const breakpointName of validBreakpointKeysForRange(name)) {
    it(`returns the correct media query for '${breakpointName}'`, () => {
      const result = mqWithValidBreakpointsForRange(name)[method](
        breakpointName
      )`
  background-color: ${() => 'GhostWhite'};
  `;
      expect(result).toMatchSnapshot();
    });
  }
};

const queryReturnsCorrectValueWithTwoBreakpoints = (name, method) => {
  const possibleBreakpointCombinations = filterIfPairSame(
    permutations(2, validBreakpointKeysForRange(name))
  );
  for (const breakpointNames of possibleBreakpointCombinations) {
    it(`returns the correct media query for '${breakpointNames[0]}' and '${
      breakpointNames[1]
    }'`, () => {
      const result = mqWithValidBreakpointsForRange(name)[method](
        ...breakpointNames
      )`
  background-color: ${() => 'GhostWhite'};
  `;
      expect(result).toMatchSnapshot();
    });
  }
};

const queryThrowsWithBothBreakpointsTheSame = (name, method) => {
  it("throws if 'from' and 'to' breakpoints are the same value", () => {
    expect(
      () => mqWithValidBreakpointsForRange(name)[method]('large', 'large')``
    ).toThrowErrorMatchingSnapshot();
  });
};

const queryThrowsIfMissingEitherBreakpoint = (name, method) => {
  it("throws if 'from' breakpoint doesn't exist", () => {
    expect(
      () => mqWithValidBreakpointsForRange(name)[method]('xxxx', 'large')``
    ).toThrowErrorMatchingSnapshot();
  });

  it("throws if 'to' breakpoint doesn't exist", () => {
    expect(
      () => mqWithValidBreakpointsForRange(name)[method]('large', 'xxxx')``
    ).toThrowErrorMatchingSnapshot();
  });
};

// -----------------------------------------------------------------------------
// Test Types
// -----------------------------------------------------------------------------

const testMediaTypes = (name, validValuesMap) => {
  const validValues = values(validValuesMap);
  const methodName = camelcase(name);
  describe(name, () => {
    it('returns the correct default media type if called with no arguments', () => {
      expect(
        mqWithValidBreakpointsForRange('width')[methodName]()
      ).toMatchSnapshot();
    });

    for (const value of validValues) {
      it(`returns the supplied ${name} for '${value}'`, () => {
        expect(
          mqWithValidBreakpointsForRange('width')[methodName](value)
        ).toMatchSnapshot();
      });
    }

    it('supports multiple values', () => {
      expect(
        mqWithValidBreakpointsForRange('width')[methodName](
          drop(2, validValues)
        )
      ).toMatchSnapshot();
    });

    it('throws if argument is not valid media type', () => {
      expect(() =>
        mqWithValidBreakpointsForRange('width')[methodName]('xxxx')
      ).toThrowErrorMatchingSnapshot();
    });
  });
};

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

const testRangedFeature = (name, { perMethodTests = [] } = {}) => {
  const camelisedName = camelcase(name);
  describe(`${name}`, () => {
    describe('range features', () => {
      // Define accessor names
      const valueMethod = camelisedName;
      const minValueMethod = camelcase('min', name);
      const maxValueMethod = camelcase('max', name);

      describe(`${valueMethod}()`, () => {
        runPerMethodTestsForFeature(perMethodTests, camelisedName, valueMethod);
      });

      describe(`${minValueMethod}()`, () => {
        runPerMethodTestsForFeature(
          perMethodTests,
          camelisedName,
          minValueMethod
        );
      });

      describe(`${maxValueMethod}()`, () => {
        runPerMethodTestsForFeature(
          perMethodTests,
          camelisedName,
          maxValueMethod
        );
      });
    });
  });
};

const testRangeQueries = (name, { perMethodTests = [] } = {}) => {
  describe(`${name}`, () => {
    describe('range queries', () => {
      const aboveMethod = camelcase('above', name);
      const belowMethod = camelcase('below', name);
      const betweenMethod = camelcase('between', pluralise(name));
      const atMethod = camelcase('at', name);
      const atBreakpointMethod = camelcase('at', name, 'Breakpoint');

      describe(`${aboveMethod}()`, () => {
        runPerMethodTestsForFeature(perMethodTests, name, aboveMethod);
      });

      describe(`${belowMethod}()`, () => {
        runPerMethodTestsForFeature(perMethodTests, name, belowMethod);
      });

      describe(`${betweenMethod}()`, () => {
        queryReturnsCorrectValueWithTwoBreakpoints(name, betweenMethod);
        queryThrowsIfMissingEitherBreakpoint(name, betweenMethod);
        queryThrowsWithBothBreakpointsTheSame(name, betweenMethod);
      });

      describe(`${atMethod}()`, () => {
        runPerMethodTestsForFeature(perMethodTests, name, atMethod);
      });

      describe(`${atBreakpointMethod}()`, () => {
        runPerMethodTestsForFeature(perMethodTests, name, atMethod);
      });
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
// Tweakpoints
// -----------------------------------------------------------------------------

describe('tweakpoints', () => {
  it('throws if no breakpoints are supplied', () => {
    expect(() =>
      mqWithValidBreakpointsForRange('width').tweak()
    ).toThrowErrorMatchingSnapshot();
  });

  it('throws if no breakpoint sets are supplied', () => {
    expect(() =>
      mqWithValidBreakpointsForRange('width').tweak({})
    ).toThrowErrorMatchingSnapshot();
  });

  it('throws if invalid breakpoint value is supplied', () => {
    expect(() =>
      mqWithValidBreakpointsForRange('width').tweak({ width: { small: 'xxx' } })
    ).toThrowErrorMatchingSnapshot();
  });
});

// -----------------------------------------------------------------------------
// Tweaked
// -----------------------------------------------------------------------------

describe('tweaked', () => {
  it('adds includes both old breakpoints and added tweakpoints', () => {
    expect(
      mqWithTweakedBreakpointsForRange('width').tweaked.aboveWidth('alpha')`
      background-color: ${() => 'GhostWhite'};
    `
    ).toMatchSnapshot();

    expect(
      mqWithTweakedBreakpointsForRange('width').tweaked.betweenWidths(
        'alpha',
        'large'
      )`
      background-color: ${() => 'GhostWhite'};
    `
    ).toMatchSnapshot();
  });

  it("doesn't effect the original mq", () => {
    expect(
      () =>
        mqWithTweakedBreakpointsForRange('width').aboveWidth('alpha')`
      background-color: ${() => 'GhostWhite'};
    `
    ).toThrowErrorMatchingSnapshot();

    // Make sure the upper limit is 'medium', not 'alpha'
    expect(
      mqWithTweakedBreakpointsForRange('width').tweaked.atWidthBreakpoint(
        'small'
      )`
      background-color: ${() => 'GhostWhite'};
    `
    ).toMatchSnapshot();
  });
});

// -----------------------------------------------------------------------------
// Media Type
// -----------------------------------------------------------------------------

testMediaTypes('mediaType', values(MEDIA_TYPES));

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
  perMethodTests: [
    featureThrowsForMissingBreakpointSet,
    featureThrowsForMissingBreakpoint,
    featureReturnsCorrectValue,
    testConfigurableSeparation,
    testConfigurableUnits,
  ],
});
testRangedFeature('height', {
  perMethodTests: [
    featureThrowsForMissingBreakpointSet,
    featureThrowsForMissingBreakpoint,
    featureReturnsCorrectValue,
    testConfigurableSeparation,
    testConfigurableUnits,
  ],
});
testRangedFeature('resolution', {
  perMethodTests: [
    featureThrowsForMissingBreakpointSet,
    featureThrowsForMissingBreakpoint,
    featureReturnsCorrectValue,
    testConfigurableSeparation,
  ],
});
testRangedFeature('aspect-ratio', {
  perMethodTests: [
    featureThrowsForMissingBreakpointSet,
    featureThrowsForMissingBreakpoint,
    featureReturnsCorrectValue,
  ],
});
testRangedFeature('color', {
  perMethodTests: [
    featureThrowsForMissingBreakpointSet,
    featureThrowsForMissingBreakpoint,
    featureReturnsCorrectValue,
  ],
});
testRangedFeature('color-index', {
  perMethodTests: [
    featureThrowsForMissingBreakpointSet,
    featureThrowsForMissingBreakpoint,
    featureReturnsCorrectValue,
  ],
});
testRangedFeature('monochrome', {
  perMethodTests: [
    featureThrowsForMissingBreakpointSet,
    featureThrowsForMissingBreakpoint,
    featureReturnsCorrectValue,
  ],
});

// -----------------------------------------------------------------------------
// Features
// -----------------------------------------------------------------------------

testRangeQueries('width', {
  perMethodTests: [
    queryThrowsIfMissingBreakpoint,
    queryReturnsCorrectValueSingleBreakpoint,
  ],
});
testRangeQueries('height', {
  perMethodTests: [
    queryThrowsIfMissingBreakpoint,
    queryReturnsCorrectValueSingleBreakpoint,
  ],
});
testRangeQueries('resolution', {
  perMethodTests: [
    queryThrowsIfMissingBreakpoint,
    queryReturnsCorrectValueSingleBreakpoint,
  ],
});
testRangeQueries('aspect-ratio', {
  perMethodTests: [
    queryThrowsIfMissingBreakpoint,
    queryReturnsCorrectValueSingleBreakpoint,
  ],
});

testRangeQueries('color', {
  perMethodTests: [
    queryThrowsIfMissingBreakpoint,
    queryReturnsCorrectValueSingleBreakpoint,
  ],
});

testRangeQueries('color-index', {
  perMethodTests: [
    queryThrowsIfMissingBreakpoint,
    queryReturnsCorrectValueSingleBreakpoint,
  ],
});

testRangeQueries('monochrome', {
  perMethodTests: [
    queryThrowsIfMissingBreakpoint,
    queryReturnsCorrectValueSingleBreakpoint,
  ],
});
