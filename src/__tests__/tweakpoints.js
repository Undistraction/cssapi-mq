import cssSerialiser from './helpers/cssSerialiser'
import {
  mqWithValidBreakpointsForRange,
  mqWithTweakedBreakpointsForRange,
} from './testHelpers/data'

expect.addSnapshotSerializer(cssSerialiser)

describe(`tweak()`, () => {
  it(`throws if invalid breakpoint map is supplied`, () => {
    expect(() =>
      mqWithValidBreakpointsForRange(`width`).tweak({ width: { small: `xxx` } })
    ).toThrowMultiline(`
      [cssapi-rhythm] tweak() Arguments included invalid value(s)
        – tweakpoints: Object included invalid value(s)
          – width: Object included invalid value(s)
            – small: (Wasn't Valid Number and Wasn't Non-Negative) or Wasn't valid non-negative number with unit: 'rem' or Wasn't valid non-negative number with unit: 'em' or Wasn't valid non-negative number with unit: 'px'`)
  })

  it(`throws if argument is invalid`, () => {
    const invalidTweakpoints = [``, true, false, `xxxx`, 444, []]

    for (const value of invalidTweakpoints) {
      expect(() => mqWithValidBreakpointsForRange(`width`).tweak(value))
        .toThrowMultiline(`
          [cssapi-rhythm] tweak() Arguments included invalid value(s)
            – tweakpoints: Wasn't Plain Object`)
    }
  })

  it(`doesn't throw with empty map`, () => {
    expect(() =>
      mqWithValidBreakpointsForRange(`width`).tweak({})
    ).not.toThrow()
  })
})

// -----------------------------------------------------------------------------
// Tweaked
// -----------------------------------------------------------------------------

describe(`tweaked()`, () => {
  it(`throws when accessing original without an original object`, () => {
    expect(() => mqWithValidBreakpointsForRange(`width`).untweaked())
      .toThrowMultiline(`
        [cssapi-rhythm] untweaked() There is no untweaked mq object available to untweak`)
  })

  it(`includes original breakpoints and added tweakpoints`, () => {
    expect(
      mqWithTweakedBreakpointsForRange(`width`).aboveWidth(`alpha`)
    ).toMatchSnapshot()

    expect(
      mqWithTweakedBreakpointsForRange(`width`).betweenWidths(`alpha`, `large`)
    ).toMatchSnapshot()
  })

  describe(`doesn't effect the original mq`, () => {
    it(`tweaked breakpoints are not available`, () => {
      expect(() =>
        mqWithTweakedBreakpointsForRange(`width`)
          .untweaked()
          .aboveWidth(`alpha`)
      ).toThrowErrorMatchingSnapshot()
    })

    it(`original breakpoints are available`, () => {
      expect(
        mqWithTweakedBreakpointsForRange(`width`)
          .untweaked()
          .atWidthBreakpoint(`small`)
      ).toMatchSnapshot()
    })
  })
})
