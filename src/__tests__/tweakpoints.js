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
  it('throws when accessing original without an original object', () => {
    expect(() =>
      mqWithValidBreakpointsForRange('width').untweaked()
    ).toThrowErrorMatchingSnapshot();
  });

  it('includes original breakpoints and added tweakpoints', () => {
    expect(
      mqWithTweakedBreakpointsForRange('width').aboveWidth('alpha')
    ).toMatchSnapshot();

    expect(
      mqWithTweakedBreakpointsForRange('width').betweenWidths('alpha', 'large')
    ).toMatchSnapshot();
  });

  it("doesn't effect the original mq", () => {
    expect(() =>
      mqWithTweakedBreakpointsForRange('width')
        .untweaked()
        .aboveWidth('alpha')
    ).toThrowErrorMatchingSnapshot();

    // Make sure the upper limit is 'medium', not 'alpha'
    expect(
      mqWithTweakedBreakpointsForRange('width')
        .untweaked()
        .atWidthBreakpoint('small')
    ).toMatchSnapshot();
  });
});
