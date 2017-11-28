import cssSerialiser from './helpers/cssSerialiser';
import {
  mqWithValidBreakpointsForRange,
  mqWithTweakedBreakpointsForRange,
} from './data';

expect.addSnapshotSerializer(cssSerialiser);

describe('tweak()', () => {
  it('throws if invalid breakpoint value is supplied', () => {
    expect(() =>
      mqWithValidBreakpointsForRange('width').tweak({ width: { small: 'xxx' } })
    ).toThrowErrorMatchingSnapshot();
  });
});

// -----------------------------------------------------------------------------
// Tweaked
// -----------------------------------------------------------------------------

describe('tweaked()', () => {
  it('includes original breakpoints and added tweakpoints', () => {
    expect(
      mqWithTweakedBreakpointsForRange('width').tweaked.aboveWidth('alpha')
    ).toMatchSnapshot();

    expect(
      mqWithTweakedBreakpointsForRange('width').tweaked.betweenWidths(
        'alpha',
        'large'
      )
    ).toMatchSnapshot();
  });

  it("doesn't effect the original mq", () => {
    expect(() =>
      mqWithTweakedBreakpointsForRange('width').aboveWidth('alpha')
    ).toThrowErrorMatchingSnapshot();

    // Make sure the upper limit is 'medium', not 'alpha'
    expect(
      mqWithTweakedBreakpointsForRange('width').tweaked.atWidthBreakpoint(
        'small'
      )
    ).toMatchSnapshot();
  });
});
