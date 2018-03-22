import {
  mqWithValidBreakpointsForRange,
  booleanValues,
  genericNumbers,
} from './testHelpers/data'
import cssSerialiser from './helpers/cssSerialiser'

/* eslint-disable ramda/no-redundant-not */

expect.addSnapshotSerializer(cssSerialiser)

describe(`query`, () => {
  it(`throws with no arguments`, () => {
    const mq = mqWithValidBreakpointsForRange(`width`)
    const { query } = mq
    expect(
      () =>
        query()`
        background-color: ${() => `GhostWhite`};
      `
    ).toThrowErrorMatchingSnapshot()
  })

  const invalidValues = [
    ...booleanValues,
    ...genericNumbers,
    null,
    undefined,
    NaN,
    {},
  ]

  for (const value of invalidValues) {
    it(`throws with invalid argument of '${value}'`, () => {
      const mq = mqWithValidBreakpointsForRange(`width`)
      const { query } = mq
      expect(
        () =>
          query(value)`
          background-color: ${() => `GhostWhite`};
        `
      ).toThrowErrorMatchingSnapshot()
    })
  }

  for (const value of invalidValues) {
    it(`throws with invalid child of '${value}'`, () => {
      const mq = mqWithValidBreakpointsForRange(`width`)
      const { query } = mq
      expect(
        () =>
          query([value])`
          background-color: ${() => `GhostWhite`};
        `
      ).toThrowErrorMatchingSnapshot()
    })
  }

  it(`throws with a nested array`, () => {
    const mq = mqWithValidBreakpointsForRange(`width`)
    const { query } = mq
    expect(
      () =>
        query([[]])`
        background-color: ${() => `GhostWhite`};
      `
    ).toThrowErrorMatchingSnapshot()
  })

  it(`renders query with single feature`, () => {
    const mq = mqWithValidBreakpointsForRange(`width`)
    const { query, minWidth } = mq
    expect(
      query(minWidth(`small`))`
        background-color: ${() => `GhostWhite`};
      `
    ).toMatchSnapshot()
  })

  describe(`and`, () => {
    // @media (min-width: 25em) and (orientation: landscape) {
    it(`renders query with two features anded together`, () => {
      const mq = mqWithValidBreakpointsForRange(`width`)
      const { query, minWidth, orientation } = mq
      expect(
        query([minWidth(`small`), orientation(`landscape`)])`
            background-color: ${() => `GhostWhite`};
          `
      ).toMatchSnapshot()
    })

    it(`renders query with multiple features anded together`, () => {
      // @media screen and (min-width: 25em) and (orientation: landscape) and (grid) {
      const mq = mqWithValidBreakpointsForRange(`width`)
      const { query, colorGamut, grid, minWidth, orientation } = mq
      expect(
        query([
          colorGamut(`srgb`),
          minWidth(`small`),
          orientation(`landscape`),
          grid(),
        ])`
            background-color: ${() => `GhostWhite`};
          `
      ).toMatchSnapshot()
    })
  })

  describe(`or`, () => {
    it(`renders query with two features ored together`, () => {
      // @media (min-width: 25em),(orientation: landscape) {
      const mq = mqWithValidBreakpointsForRange(`width`)
      const { query, minWidth, orientation } = mq
      expect(
        query(minWidth(`small`), orientation(`landscape`))`
            background-color: ${() => `GhostWhite`};
          `
      ).toMatchSnapshot()
    })

    it(`renders query with multiple features ored together`, () => {
      // @media screen,(min-width: 25em),(orientation: landscape),(grid) {
      const mq = mqWithValidBreakpointsForRange(`width`)
      const { query, minWidth, orientation, colorGamut, grid } = mq
      expect(
        query(
          colorGamut(`srgb`),
          minWidth(`small`),
          orientation(`landscape`),
          grid()
        )`
            background-color: ${() => `GhostWhite`};
          `
      ).toMatchSnapshot()
    })
  })

  describe(`not`, () => {
    it(`throws with no arguments`, () => {
      const mq = mqWithValidBreakpointsForRange(`width`)
      const { query, not } = mq
      expect(
        () =>
          query(not())`
          background-color: ${() => `GhostWhite`};
        `
      ).toThrowErrorMatchingSnapshot()
    })

    for (const value of invalidValues) {
      it(`throws with invalid argument of '${value}'`, () => {
        const mq = mqWithValidBreakpointsForRange(`width`)
        const { query, not } = mq
        expect(
          () =>
            query(not(value))`
            background-color: ${() => `GhostWhite`};
          `
        ).toThrowErrorMatchingSnapshot()
      })
    }

    for (const value of invalidValues) {
      it(`throws with invalid child of '${value}'`, () => {
        const mq = mqWithValidBreakpointsForRange(`width`)
        const { query, not } = mq
        expect(
          () =>
            query(not([value]))`
            background-color: ${() => `GhostWhite`};
          `
        ).toThrowErrorMatchingSnapshot()
      })
    }

    it(`throws with a nested array`, () => {
      const mq = mqWithValidBreakpointsForRange(`width`)
      const { query, not } = mq
      expect(
        () =>
          query(not([[]]))`
          background-color: ${() => `GhostWhite`};
        `
      ).toThrowErrorMatchingSnapshot()
    })

    it(`negates anded queries`, () => {
      // @media not screen and (color) and (orientation: landscape) {
      const mq = mqWithValidBreakpointsForRange(`width`)
      const { displayMode, query, not, colorGamut, orientation } = mq
      expect(
        query(
          not([
            displayMode(`fullscreen`),
            colorGamut(`p3`),
            orientation(`landscape`),
          ])
        )`
            background-color: ${() => `GhostWhite`};
          `
      ).toMatchSnapshot()
    })

    it(`negates ored queries`, () => {
      // @media not screen, not (color), not (orientation: landscape) {
      const mq = mqWithValidBreakpointsForRange(`width`)
      const { displayMode, query, not, colorGamut, orientation } = mq
      expect(
        query(
          not(
            displayMode(`fullscreen`),
            colorGamut(`p3`),
            orientation(`landscape`)
          )
        )`
            background-color: ${() => `GhostWhite`};
          `
      ).toMatchSnapshot()
    })

    describe(`with media type`, () => {
      it(`renders single uquery with media type without adding default media type`, () => {
        // @media (min-width: 25em) {
        const mq = mqWithValidBreakpointsForRange(`width`)
        const { query, not, displayMode, mediaType } = mq
        expect(
          query(not(mediaType(), displayMode(`fullscreen`)))`
              background-color: ${() => `GhostWhite`};
            `
        ).toMatchSnapshot()
      })

      it(`negates anded queries without adding default media type`, () => {
        // @media not screen and (color) and (orientation: landscape) {
        const mq = mqWithValidBreakpointsForRange(`width`)
        const {
          mediaType,
          displayMode,
          query,
          not,
          colorGamut,
          orientation,
        } = mq
        expect(
          query(
            not([
              mediaType(),
              displayMode(`fullscreen`),
              colorGamut(`p3`),
              orientation(`landscape`),
            ])
          )`
              background-color: ${() => `GhostWhite`};
            `
        ).toMatchSnapshot()
      })

      it(`negates ored queries without adding default media type`, () => {
        // @media not screen, not (color), not (orientation: landscape) {
        const mq = mqWithValidBreakpointsForRange(`width`)
        const {
          mediaType,
          displayMode,
          query,
          not,
          colorGamut,
          orientation,
        } = mq
        expect(
          query(
            not(
              mediaType(),
              displayMode(`fullscreen`),
              colorGamut(`p3`),
              orientation(`landscape`)
            )
          )`
              background-color: ${() => `GhostWhite`};
            `
        ).toMatchSnapshot()
      })
    })
  })

  describe(`mixed`, () => {
    it(`allows mixed queries (both and and or)`, () => {
      // @media  screen, (color), screen and (color) and (orientation: landscape) {
      const mq = mqWithValidBreakpointsForRange(`width`)
      const { displayMode, query, colorGamut, orientation } = mq
      expect(
        query(displayMode(`fullscreen`), colorGamut(`rec2020`), [
          displayMode(`standalone`),
          orientation(`landscape`),
        ])`
              background-color: ${() => `GhostWhite`};
            `
      ).toMatchSnapshot()
    })

    it(`allows mixed not queries (both and and or)`, () => {
      // @media not screen, not (color), not screen and (color) and (orientation: landscape) {
      const mq = mqWithValidBreakpointsForRange(`width`)
      const { displayMode, query, not, colorGamut, orientation, grid } = mq
      expect(
        query(
          not(displayMode(`fullscreen`), colorGamut(`rec2020`), [
            grid(0),
            orientation(`landscape`),
          ])
        )`
              background-color: ${() => `GhostWhite`};
            `
      ).toMatchSnapshot()
    })

    it(`allows mixed queries and not queries (both and and or)`, () => {
      // @media not screen, not (color), not screen and (color) and (orientation: landscape) {
      const mq = mqWithValidBreakpointsForRange(`width`)
      const { grid, atWidth, query, not, colorGamut, orientation } = mq
      expect(
        query(
          grid(),
          colorGamut(`rec2020`),
          [grid(1), orientation(`landscape`)],
          not(grid(), [atWidth(`large`), orientation(`portrait`)])
        )`
              background-color: ${() => `GhostWhite`};
            `
      ).toMatchSnapshot()
    })
  })
})
