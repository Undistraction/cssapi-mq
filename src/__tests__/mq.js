import './helpers/toEqualCSS';
import styledMQ from '../mq';
import { InvalidValueError } from '../errors';

// Register serializer for use by Jest in generating snapshots. Without a serializer the snapshots are difficult to read.
import cssSerialiser from './helpers/cssSerialiser';

expect.addSnapshotSerializer(cssSerialiser);

const validBreakpoints = {
  small: 400, // 0–400
  medium: 900, // 400–900
  large: 1100, // 900–1100
  xLarge: 1300, // 1100–1300
};

const validBreakpointsWidthOnly = {
  width: validBreakpoints,
};

const validBreakpointsHeightOnly = {
  height: validBreakpoints,
};

const mqWithWidthBreakpoints = (config = {}) =>
  styledMQ.configure(validBreakpointsWidthOnly, config);

const mqWithHeightBreakpoints = (config = {}) =>
  styledMQ.configure(validBreakpointsHeightOnly, config);

const mqWithNoWidthBreakpoints = () => styledMQ.configure({});
const mqWithNoHeightBreakpoints = () => styledMQ.configure({});

const mqWithTweakedWidthBreakpoints = () =>
  mqWithWidthBreakpoints().tweak({ width: { alpha: 300 } });

const testConfiguredUnits = (mq, method, ...args) => {
  it('renders configured units', () => {
    expect(mq({ unit: 'rem' })[method](...args)).toMatchSnapshot();

    expect(mq({ unit: 'px' })[method](...args)).toMatchSnapshot();
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
    expect(() => mqWithWidthBreakpoints.not.toThrowError(InvalidValueError));
  });

  describe('config object', () => {
    it("adjusts values based on 'basefontSize'", () => {
      const result = styledMQ
        .configure(validBreakpointsWidthOnly, { baseFontSize: 10 })
        .belowWidth('small')`
        background-color: ${() => 'GhostWhite'};
      `;
      expect(result).toMatchSnapshot();
    });

    it("throws if 'baseFontSize' is not a positive number", () => {
      const config = { baseFontSize: 'xxxx' };
      expect(() =>
        styledMQ.configure(validBreakpointsWidthOnly, config)
      ).toThrowError(InvalidValueError);
    });

    it("doesn't throw an error if 'baseFontSize' is a positive number", () => {
      const config = { baseFontSize: 12 };
      expect(() =>
        styledMQ.configure(validBreakpointsWidthOnly, config)
      ).not.toThrowError(InvalidValueError);
    });

    it("throws if 'defaultMediaType' is not valid", () => {
      const config = { defaultMediaType: 'xxxx' };
      expect(() =>
        styledMQ.configure(validBreakpointsWidthOnly, config)
      ).toThrowError(InvalidValueError);
    });

    it("doesn't throw an error if 'defaultMediaType' is valid", () => {
      expect(() =>
        styledMQ.configure(validBreakpointsWidthOnly, {
          defaultMediaType: 'all',
        })
      ).not.toThrowError(InvalidValueError);
      expect(() =>
        styledMQ.configure(validBreakpointsWidthOnly, { defaultMediaType: '' })
      ).not.toThrowError(InvalidValueError);
      expect(() =>
        styledMQ.configure(validBreakpointsWidthOnly, {
          defaultMediaType: ['screen', 'print'],
        })
      ).not.toThrowError(InvalidValueError);
    });

    it("throws if 'unit' is not valid", () => {
      const config = { unit: 'xxxx' };
      expect(() =>
        styledMQ.configure(validBreakpointsWidthOnly, config)
      ).toThrowError(InvalidValueError);
    });

    it("doesn't throw an error if 'unit' is valid", () => {
      const config = { unit: 'px' };
      expect(() =>
        styledMQ.configure(validBreakpointsWidthOnly, config)
      ).not.toThrowError(InvalidValueError);
    });

    it("throws if 'shouldSeparateQueries' is not a boolean", () => {
      const config = { shouldSeparateQueries: 'xxxx' };
      expect(() =>
        styledMQ.configure(validBreakpointsWidthOnly, config)
      ).toThrowError(InvalidValueError);
    });

    it("doesn't throw an error if 'shouldSeparateQueries' is a boolean", () => {
      const config = { shouldSeparateQueries: false };
      expect(() =>
        styledMQ.configure(validBreakpointsWidthOnly, config)
      ).not.toThrowError(InvalidValueError);
    });
  });
});

// -----------------------------------------------------------------------------
// Tweakpoints
// -----------------------------------------------------------------------------

describe('tweakpoints', () => {
  it('throws if no breakpoints are supplied', () => {
    expect(() => mqWithWidthBreakpoints().tweak()).toThrowError(
      InvalidValueError
    );
  });

  it('throws if no breakpoint sets are supplied', () => {
    expect(() => mqWithWidthBreakpoints().tweak({})).toThrowError(
      InvalidValueError
    );
  });

  it('throws if invalid breakpoint value is supplied', () => {
    expect(() =>
      mqWithWidthBreakpoints().tweak({ width: { small: 'xxx' } })
    ).toThrowError(InvalidValueError);
  });
});

// -----------------------------------------------------------------------------
// Tweaked
// -----------------------------------------------------------------------------

describe('tweaked', () => {
  it('adds includes both old breakpoints and added tweakpoints', () => {
    expect(
      mqWithTweakedWidthBreakpoints().tweaked.aboveWidth('alpha')`
      background-color: ${() => 'GhostWhite'};
    `
    ).toMatchSnapshot();

    expect(
      mqWithTweakedWidthBreakpoints().tweaked.betweenWidths('alpha', 'large')`
      background-color: ${() => 'GhostWhite'};
    `
    ).toMatchSnapshot();
  });

  it("doesn't effect the original mq", () => {
    expect(
      () =>
        mqWithTweakedWidthBreakpoints().aboveWidth('alpha')`
      background-color: ${() => 'GhostWhite'};
    `
    ).toThrowError(InvalidValueError);

    // Make sure the upper limit is 'medium', not 'alpha'
    expect(
      mqWithTweakedWidthBreakpoints().tweaked.atWidthBreakpoint('small')`
      background-color: ${() => 'GhostWhite'};
    `
    ).toMatchSnapshot();
  });
});

// -----------------------------------------------------------------------------
// Media Fragments
// -----------------------------------------------------------------------------

describe('minWidth', () => {
  testConfiguredUnits(mqWithWidthBreakpoints, 'minWidth', 'small');

  it('returns the correct media fragment', () => {
    expect(mqWithWidthBreakpoints().minWidth('small')).toMatchSnapshot();
  });

  it("throws if breakpoint doesn't exist", () => {
    expect(() => mqWithWidthBreakpoints().minWidth('xxxx')).toThrowError(
      InvalidValueError
    );
  });

  it("throws if 'width' breakpoint map doesn't exist", () => {
    expect(() => mqWithNoWidthBreakpoints().minWidth('xxxx')).toThrowError(
      InvalidValueError
    );
  });
});

describe('maxWidth', () => {
  testConfiguredUnits(mqWithWidthBreakpoints, 'maxWidth', 'small');

  it('returns the correct media fragment', () => {
    expect(mqWithWidthBreakpoints().maxWidth('small')).toMatchSnapshot();
  });

  it("throws if breakpoint doesn't exist", () => {
    expect(() => mqWithWidthBreakpoints().maxWidth('xxxx')).toThrowError(
      InvalidValueError
    );
  });

  it("throws if 'width' breakpoint map doesn't exist", () => {
    expect(() => mqWithNoWidthBreakpoints().maxWidth('xxxx')).toThrowError(
      InvalidValueError
    );
  });
});

describe('minHeight', () => {
  testConfiguredUnits(mqWithHeightBreakpoints, 'minHeight', 'small');

  it('returns the correct media fragment', () => {
    expect(mqWithHeightBreakpoints().minHeight('small')).toMatchSnapshot();
  });

  it("throws if breakpoint doesn't exist", () => {
    expect(() => mqWithWidthBreakpoints().minHeight('xxxx')).toThrowError(
      InvalidValueError
    );
  });

  it("throws if 'height' breakpoint map doesn't exist", () => {
    expect(() => mqWithNoHeightBreakpoints().minHeight('xxxx')).toThrowError(
      InvalidValueError
    );
  });
});

describe('maxHeight', () => {
  testConfiguredUnits(mqWithHeightBreakpoints, 'maxHeight', 'small');

  it('returns the correct media fragment', () => {
    expect(mqWithHeightBreakpoints().maxHeight('small')).toMatchSnapshot();
  });

  it("throws if breakpoint doesn't exist", () => {
    expect(() => mqWithWidthBreakpoints().maxHeight('xxxx')).toThrowError(
      InvalidValueError
    );
  });

  it("throws if 'height' breakpoint map doesn't exist", () => {
    expect(() => mqWithNoHeightBreakpoints().maxWidth('xxxx')).toThrowError(
      InvalidValueError
    );
  });
});

describe('mediaType', () => {
  it('returns the correct default media type if called with no arguments', () => {
    expect(mqWithWidthBreakpoints().mediaType()).toMatchSnapshot();
  });

  it('returns the configured media type if passed in as argument', () => {
    expect(mqWithWidthBreakpoints().mediaType('print')).toMatchSnapshot();
  });

  it('returns the configured media type if passed in as argument', () => {
    expect(
      mqWithWidthBreakpoints().mediaType(['print', 'screen'])
    ).toMatchSnapshot();
  });

  it('throws if arument is not valid media type', () => {
    expect(() => mqWithWidthBreakpoints().mediaType('xxxx')).toThrowError(
      InvalidValueError
    );
  });
});

describe('orientation', () => {
  it('returns the supplied orientation', () => {
    expect(mqWithWidthBreakpoints().orientation('landscape')).toMatchSnapshot();
  });

  it('throws if arument is not valid media type', () => {
    expect(() => mqWithWidthBreakpoints().orientation('xxxx')).toThrowError(
      InvalidValueError
    );
  });
});

// -----------------------------------------------------------------------------
// Media Queries
// -----------------------------------------------------------------------------

describe('aboveWidth', () => {
  it('returns the correct media query', () => {
    const result = mqWithWidthBreakpoints().aboveWidth('small')`
        background-color: ${() => 'GhostWhite'};
      `;
    expect(result).toMatchSnapshot();
  });

  it("throws if breakpoint doesn't exist", () => {
    expect(() => mqWithWidthBreakpoints().aboveWidth('xxxx')``).toThrowError(
      InvalidValueError
    );
  });
});

describe('belowWidth', () => {
  it('returns the correct media query', () => {
    const result = mqWithWidthBreakpoints().belowWidth('small')`
        background-color: ${() => 'GhostWhite'};
      `;
    expect(result).toMatchSnapshot();
  });

  it("throws if breakpoint doesn't exist", () => {
    expect(() => mqWithWidthBreakpoints().belowWidth('xxxx')``).toThrowError(
      InvalidValueError
    );
  });
});

describe('betweenWidths', () => {
  it('returns the correct media query', () => {
    const result = mqWithWidthBreakpoints().betweenWidths('small', 'medium')`
        background-color: ${() => 'GhostWhite'};
      `;
    expect(result).toMatchSnapshot();
  });

  it('returns the correct media query with breakpoint order reversed', () => {
    const result = mqWithWidthBreakpoints().betweenWidths('medium', 'small')`
        background-color: ${() => 'GhostWhite'};
      `;
    expect(result).toMatchSnapshot();
  });

  it("throws if 'from' breakpoint doesn't exist", () => {
    expect(
      () => mqWithWidthBreakpoints().betweenWidths('xxxx', 'large')``
    ).toThrowError(InvalidValueError);
  });

  it("throws if 'to' breakpoint doesn't exist", () => {
    expect(
      () => mqWithWidthBreakpoints().betweenWidths('large', 'xxxx')``
    ).toThrowError(InvalidValueError);
  });

  it("throws if 'from' and 'to' breakpoints are the same value", () => {
    expect(
      () => mqWithWidthBreakpoints().betweenWidths('large', 'large')``
    ).toThrowError(InvalidValueError);
  });
});

describe('atWidthBreakpoint', () => {
  it('returns the correct query when it is first breakpoint', () => {
    const result = mqWithWidthBreakpoints().atWidthBreakpoint('small')`
        background-color: ${() => 'GhostWhite'};
      `;
    expect(result).toMatchSnapshot();
  });

  it('returns the correct query when it is last breakpoint', () => {
    const result = mqWithWidthBreakpoints().atWidthBreakpoint('xLarge')`
        background-color: ${() => 'GhostWhite'};
      `;
    expect(result).toMatchSnapshot();
  });

  it('returns the correct query when it is between other breakpoints', () => {
    const result = mqWithWidthBreakpoints().atWidthBreakpoint('large')`
        background-color: ${() => 'GhostWhite'};
      `;
    expect(result).toMatchSnapshot();
  });

  it("throws if breakpoint doesn't exist", () => {
    expect(
      () => mqWithWidthBreakpoints().atWidthBreakpoint('xxxx')``
    ).toThrowError(InvalidValueError);
  });
});

describe('aboveWidth', () => {
  it('returns the correct media query', () => {
    const result = mqWithWidthBreakpoints().aboveWidth('small')`
        background-color: ${() => 'GhostWhite'};
      `;
    expect(result).toMatchSnapshot();
  });

  it("throws if breakpoint doesn't exist", () => {
    expect(() => mqWithWidthBreakpoints().aboveWidth('xxxx')``).toThrowError(
      InvalidValueError
    );
  });
});

describe('belowWidth', () => {
  it('returns the correct media query', () => {
    const result = mqWithWidthBreakpoints().belowWidth('small')`
        background-color: ${() => 'GhostWhite'};
      `;
    expect(result).toMatchSnapshot();
  });

  it("throws if breakpoint doesn't exist", () => {
    expect(() => mqWithWidthBreakpoints().belowWidth('xxxx')``).toThrowError(
      InvalidValueError
    );
  });
});

describe('betweenHeights', () => {
  it('returns the correct media query', () => {
    const result = mqWithHeightBreakpoints().betweenHeights('small', 'medium')`
        background-color: ${() => 'GhostWhite'};
      `;
    expect(result).toMatchSnapshot();
  });

  it('returns the correct media query with breakpoint order reversed', () => {
    const result = mqWithHeightBreakpoints().betweenHeights('medium', 'small')`
        background-color: ${() => 'GhostWhite'};
      `;
    expect(result).toMatchSnapshot();
  });

  it("throws if 'from' breakpoint doesn't exist", () => {
    expect(
      () => mqWithHeightBreakpoints().betweenHeights('xxxx', 'large')``
    ).toThrowError(InvalidValueError);
  });

  it("throws if 'to' breakpoint doesn't exist", () => {
    expect(
      () => mqWithHeightBreakpoints().betweenHeights('large', 'xxxx')``
    ).toThrowError(InvalidValueError);
  });

  it("throws if 'from' and 'to' breakpoints are the same value", () => {
    expect(
      () => mqWithHeightBreakpoints().betweenHeights('large', 'large')``
    ).toThrowError(InvalidValueError);
  });
});

describe('atHeightBreakpoint', () => {
  it('returns the correct query when it is first breakpoint', () => {
    const result = mqWithHeightBreakpoints().atHeightBreakpoint('small')`
        background-color: ${() => 'GhostWhite'};
      `;
    expect(result).toMatchSnapshot();
  });

  it('returns the correct query when it is last breakpoint', () => {
    const result = mqWithHeightBreakpoints().atHeightBreakpoint('xLarge')`
        background-color: ${() => 'GhostWhite'};
      `;
    expect(result).toMatchSnapshot();
  });

  it('returns the correct query when it is between other breakpoints', () => {
    const result = mqWithHeightBreakpoints().atHeightBreakpoint('large')`
        background-color: ${() => 'GhostWhite'};
      `;
    expect(result).toMatchSnapshot();
  });

  it("throws if breakpoint doesn't exist", () => {
    expect(
      () => mqWithHeightBreakpoints().atHeightBreakpoint('xxxx')``
    ).toThrowError(InvalidValueError);
  });
});
