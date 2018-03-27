import { mqWithValidBreakpointsForRange } from '../testHelpers/data'

export const configOutputsConfiguredDimensionUnits = (name, method) => {
  it(`renders configured dimensionsUnits`, () => {
    expect(
      mqWithValidBreakpointsForRange(name, { dimensionsUnit: `rem` })[method](
        `small`
      )
    ).toMatchSnapshot()

    expect(
      mqWithValidBreakpointsForRange(name, { dimensionsUnit: `px` })[method](
        `small`
      )
    ).toMatchSnapshot()
  })
}

export const configSeparatesValuesWhenSet = (name, method) => {
  it(`doesn't separate values if not configured to do so`, () => {
    expect(
      mqWithValidBreakpointsForRange(name, { shouldSeparateQueries: false })[
        method
      ](`small`)
    ).toMatchSnapshot()
  })
}
