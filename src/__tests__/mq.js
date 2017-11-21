import { values, drop } from 'ramda';
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

const validBreakpoints = {
  width: validDimensionBreakpoints,
  height: validDimensionBreakpoints,
  resolution: validResolutionBreakpoints,
  aspectRatio: validAspectRatioBreakpoints,
};

const validBreakpointsForRange = name => {
  const camelisedName = camelcase(name);
  const o = {};
  o[camelisedName] = validBreakpoints[camelisedName];
  return o;
};

const mqWithValidBreakpointsForRange = (name, config = {}) =>
  styledMQ.configure(validBreakpointsForRange(name), config);

const mqWithTweakedBreakpointsForRange = name =>
  styledMQ
    .configure(validBreakpointsForRange(name))
    .tweak({ width: { alpha: 300 } });

const mqWithNoBreakpoints = () => styledMQ.configure({});

const testConfiguredUnits = (name, method, ...args) => {
  it('renders configured dimensionsUnits', () => {
    expect(
      mqWithValidBreakpointsForRange(name, { dimensionsUnit: 'rem' })[method](
        ...args
      )
    ).toMatchSnapshot();

    expect(
      mqWithValidBreakpointsForRange(name, { dimensionsUnit: 'px' })[method](
        ...args
      )
    ).toMatchSnapshot();
  });
};

const testConfigurableSeparation = (name, method, ...args) => {
  it("doesn't separate dimensionsUnits if not configured", () => {
    expect(
      mqWithValidBreakpointsForRange(name, { shouldSeparateQueries: false })[
        method
      ](...args)
    ).toMatchSnapshot();
  });
};

const testRangeQuery = (name, testUnits = false) => {
  describe(`${name} range`, () => {
    const capitalizedName = name[0].toUpperCase() + camelcase(name).slice(1);
    const camelisedName = camelcase(name);

    describe('accessors', () => {
      // Define accessor names
      const minValue = `min${capitalizedName}`;
      const maxValue = `max${capitalizedName}`;

      describe(`${camelisedName}()`, () => {
        if (testUnits) testConfiguredUnits(name, camelisedName, 'small');
        testConfigurableSeparation(name, camelisedName, 'small');

        it('returns the correct media fragment', () => {
          expect(
            mqWithValidBreakpointsForRange(name)[camelisedName]('small')
          ).toMatchSnapshot();
        });

        it("throws if breakpoint doesn't exist", () => {
          expect(() =>
            mqWithValidBreakpointsForRange(name)[camelisedName]('xxxx')
          ).toThrowError(InvalidValueError);
        });

        it(`throws if ${name} breakpoint map doesn't exist`, () => {
          expect(() =>
            mqWithNoBreakpoints()[camelisedName]('xxxx')
          ).toThrowError(InvalidValueError);
        });
      });

      describe(`${minValue}()`, () => {
        if (testUnits) testConfiguredUnits(name, minValue, 'small');
        testConfigurableSeparation(name, minValue, 'small');

        it('returns the correct media fragment', () => {
          expect(
            mqWithValidBreakpointsForRange(name)[minValue]('small')
          ).toMatchSnapshot();
        });

        it("throws if breakpoint doesn't exist", () => {
          expect(() =>
            mqWithValidBreakpointsForRange(name)[minValue]('xxxx')
          ).toThrowError(InvalidValueError);
        });

        it(`throws if ${name} breakpoint map doesn't exist`, () => {
          expect(() => mqWithNoBreakpoints()[minValue]('xxxx')).toThrowError(
            InvalidValueError
          );
        });
      });

      describe(`${maxValue}()`, () => {
        if (testUnits) testConfiguredUnits(name, maxValue, 'small');
        testConfigurableSeparation(name, maxValue, 'small');

        it('returns the correct media fragment', () => {
          expect(
            mqWithValidBreakpointsForRange(name)[maxValue]('small')
          ).toMatchSnapshot();
        });

        it("throws if breakpoint doesn't exist", () => {
          expect(() =>
            mqWithValidBreakpointsForRange(name)[maxValue]('xxxx')
          ).toThrowError(InvalidValueError);
        });

        it(`throws if ${name} breakpoint map doesn't exist`, () => {
          expect(() => mqWithNoBreakpoints()[maxValue]('xxxx')).toThrowError(
            InvalidValueError
          );
        });
      });
    });
    describe('queries', () => {
      // Define accessor names
      const above = `above${capitalizedName}`;
      const below = `below${capitalizedName}`;
      const between = `between${capitalizedName}s`;
      const at = `at${capitalizedName}`;
      const atBreakpoint = `at${capitalizedName}Breakpoint`;

      describe(`${above}()`, () => {
        it('returns the correct media query', () => {
          const result = mqWithValidBreakpointsForRange(name)[above]('small')`
        background-color: ${() => 'GhostWhite'};
      `;
          expect(result).toMatchSnapshot();
        });

        it("throws if breakpoint doesn't exist", () => {
          expect(
            () => mqWithValidBreakpointsForRange(name)[above]('xxxx')``
          ).toThrowError(InvalidValueError);
        });
      });

      describe(`${below}()`, () => {
        it('returns the correct media query', () => {
          const result = mqWithValidBreakpointsForRange(name)[below]('small')`
        background-color: ${() => 'GhostWhite'};
      `;
          expect(result).toMatchSnapshot();
        });

        it("throws if breakpoint doesn't exist", () => {
          expect(
            () => mqWithValidBreakpointsForRange(name)[below]('xxxx')``
          ).toThrowError(InvalidValueError);
        });
      });

      describe(`${between}()`, () => {
        it('returns the correct media query', () => {
          const result = mqWithValidBreakpointsForRange(name)[between](
            'small',
            'medium'
          )`
        background-color: ${() => 'GhostWhite'};
      `;
          expect(result).toMatchSnapshot();
        });

        it('returns the correct media query with breakpoint order reversed', () => {
          const result = mqWithValidBreakpointsForRange(name)[between](
            'medium',
            'small'
          )`
        background-color: ${() => 'GhostWhite'};
      `;
          expect(result).toMatchSnapshot();
        });

        it("throws if 'from' breakpoint doesn't exist", () => {
          expect(
            () =>
              mqWithValidBreakpointsForRange(name)[between]('xxxx', 'large')``
          ).toThrowError(InvalidValueError);
        });

        it("throws if 'to' breakpoint doesn't exist", () => {
          expect(
            () =>
              mqWithValidBreakpointsForRange(name)[between]('large', 'xxxx')``
          ).toThrowError(InvalidValueError);
        });

        it("throws if 'from' and 'to' breakpoints are the same value", () => {
          expect(
            () =>
              mqWithValidBreakpointsForRange(name)[between]('large', 'large')``
          ).toThrowError(InvalidValueError);
        });
      });

      describe(`${at}()`, () => {
        it('returns the correct media query', () => {
          const result = mqWithValidBreakpointsForRange(name)[at]('small')`
              background-color: ${() => 'GhostWhite'};
            `;
          expect(result).toMatchSnapshot();
        });

        it("throws if breakpoint doesn't exist", () => {
          expect(
            () => mqWithValidBreakpointsForRange(name)[at]('xxxx')``
          ).toThrowError(InvalidValueError);
        });
      });

      describe(`${atBreakpoint}()`, () => {
        it('returns the correct query when it is first breakpoint', () => {
          const result = mqWithValidBreakpointsForRange(name)[atBreakpoint](
            'small'
          )`
        background-color: ${() => 'GhostWhite'};
      `;
          expect(result).toMatchSnapshot();
        });

        it('returns the correct query when it is last breakpoint', () => {
          const result = mqWithValidBreakpointsForRange(name)[atBreakpoint](
            'xLarge'
          )`
        background-color: ${() => 'GhostWhite'};
      `;
          expect(result).toMatchSnapshot();
        });

        it('returns the correct query when it is between other breakpoints', () => {
          const result = mqWithValidBreakpointsForRange(name)[atBreakpoint](
            'large'
          )`
        background-color: ${() => 'GhostWhite'};
      `;
          expect(result).toMatchSnapshot();
        });

        it("throws if breakpoint doesn't exist", () => {
          expect(
            () => mqWithValidBreakpointsForRange(name)[atBreakpoint]('xxxx')``
          ).toThrowError(InvalidValueError);
        });
      });
    });
  });
};

const testFeature = (name, validValuesMap, config = {}) => {
  const validValues = values(validValuesMap);
  const camelisedName = camelcase(name);
  describe(name, () => {
    if (config.default) {
      it('returns the correct default media type if called with no arguments', () => {
        expect(
          mqWithValidBreakpointsForRange('width')[camelisedName]()
        ).toMatchSnapshot();
      });
    } else {
      it('throws if no argument is supplied', () => {
        expect(() =>
          mqWithValidBreakpointsForRange('width')[camelisedName]()
        ).toThrowError(InvalidValueError);
      });
    }

    for (const value of validValues) {
      it(`returns the supplied ${name} for '${value}'`, () => {
        expect(
          mqWithValidBreakpointsForRange('width')[camelisedName](value)
        ).toMatchSnapshot();
      });
    }

    if (config.multiple) {
      it('supports multiple values', () => {
        expect(
          mqWithValidBreakpointsForRange('width')[camelisedName](
            drop(2, validValues)
          )
        ).toMatchSnapshot();
      });
    }

    it('throws if argument is not valid media type', () => {
      expect(() =>
        mqWithValidBreakpointsForRange('width')[camelisedName]('xxxx')
      ).toThrowError(InvalidValueError);
    });
  });
};

// -----------------------------------------------------------------------------
// Configuration
// -----------------------------------------------------------------------------

describe('configuration', () => {
  it('throws if no breakpoints are supplied', () => {
    expect(() => styledMQ.configure()).toThrowError(InvalidValueError);
  });

  it('throws if no breakpoint sets are supplied', () => {
    expect(() => styledMQ.configure({})).toThrowError(InvalidValueError);
  });

  it('throws if invalid breakpoint value is supplied', () => {
    expect(() => styledMQ.configure({ width: { small: 'xxx' } })).toThrowError(
      InvalidValueError
    );
  });

  it("doesn't throw an error with default configuration", () => {
    expect(() =>
      mqWithValidBreakpointsForRange('width').not.toThrowError(
        InvalidValueError
      )
    );
  });

  describe('config object', () => {
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
      ).toThrowError(InvalidValueError);
    });

    it("doesn't throw an error if 'baseFontSize' is a positive number", () => {
      const config = { baseFontSize: 12 };
      expect(() =>
        styledMQ.configure(validBreakpointsForRange('width'), config)
      ).not.toThrowError(InvalidValueError);
    });

    it("throws if 'defaultMediaType' is not valid", () => {
      const config = { defaultMediaType: 'xxxx' };
      expect(() =>
        styledMQ.configure(validBreakpointsForRange('width'), config)
      ).toThrowError(InvalidValueError);
    });

    it("doesn't throw an error if 'defaultMediaType' is valid", () => {
      expect(() =>
        styledMQ.configure(validBreakpointsForRange('width'), {
          defaultMediaType: 'all',
        })
      ).not.toThrowError(InvalidValueError);
      expect(() =>
        styledMQ.configure(validBreakpointsForRange('width'), {
          defaultMediaType: '',
        })
      ).not.toThrowError(InvalidValueError);
      expect(() =>
        styledMQ.configure(validBreakpointsForRange('width'), {
          defaultMediaType: ['screen', 'print'],
        })
      ).not.toThrowError(InvalidValueError);
    });

    it("throws if 'dimensionsUnit' is not valid", () => {
      const config = { dimensionsUnit: 'xxxx' };
      expect(() =>
        styledMQ.configure(validBreakpointsForRange('width'), config)
      ).toThrowError(InvalidValueError);
    });

    it("doesn't throw an error if 'dimensionsUnit' is valid", () => {
      const config = { dimensionsUnit: 'px' };
      expect(() =>
        styledMQ.configure(validBreakpointsForRange('width'), config)
      ).not.toThrowError(InvalidValueError);
    });

    it("throws if 'shouldSeparateQueries' is not a boolean", () => {
      const config = { shouldSeparateQueries: 'xxxx' };
      expect(() =>
        styledMQ.configure(validBreakpointsForRange('width'), config)
      ).toThrowError(InvalidValueError);
    });

    it("doesn't throw an error if 'shouldSeparateQueries' is a boolean", () => {
      const config = { shouldSeparateQueries: false };
      expect(() =>
        styledMQ.configure(validBreakpointsForRange('width'), config)
      ).not.toThrowError(InvalidValueError);
    });
  });
});

// -----------------------------------------------------------------------------
// Tweakpoints
// -----------------------------------------------------------------------------

describe('tweakpoints', () => {
  it('throws if no breakpoints are supplied', () => {
    expect(() => mqWithValidBreakpointsForRange('width').tweak()).toThrowError(
      InvalidValueError
    );
  });

  it('throws if no breakpoint sets are supplied', () => {
    expect(() =>
      mqWithValidBreakpointsForRange('width').tweak({})
    ).toThrowError(InvalidValueError);
  });

  it('throws if invalid breakpoint value is supplied', () => {
    expect(() =>
      mqWithValidBreakpointsForRange('width').tweak({ width: { small: 'xxx' } })
    ).toThrowError(InvalidValueError);
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
    ).toThrowError(InvalidValueError);

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
// Media Fragments
// -----------------------------------------------------------------------------

testFeature('mediaType', values(MEDIA_TYPES), {
  default: 'all',
  multiple: true,
});
testRangeQuery('width', true);
testRangeQuery('height', true);
testRangeQuery('resolution');
testRangeQuery('aspect-ratio');
testFeature('orientation', ORIENTATION);
testFeature('scan', SCAN);
testFeature('grid', GRID);
testFeature('update', UPDATE);
testFeature('overflow-block', OVERFLOW_BLOCK);
testFeature('overflow-inline', OVERFLOW_INLINE);
testFeature('color-gamut', COLOR_GAMUT);
testFeature('display-mode', DISPLAY_MODE);
