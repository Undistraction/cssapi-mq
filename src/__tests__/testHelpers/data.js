import { keys } from 'ramda'
import camelcase from 'camelcase'
import styledMQ from '../../mq'

// -----------------------------------------------------------------------------
// Values
// -----------------------------------------------------------------------------

export const junkValuesNotNull = [undefined, NaN, ``, [], {}]
export const junkValuesNotUndefined = [null, NaN, ``, [], {}]
export const junkValues = [null, ...junkValuesNotNull]
export const booleanValues = [true, false]
export const invalidValues = [...junkValues, ...booleanValues]
export const invalidValuesNotNull = [...junkValuesNotNull, ...booleanValues]
export const invalidValuesNotUndefined = [
  ...junkValuesNotUndefined,
  ...booleanValues,
]
export const genericStrings = [`xxxx`]
export const genericPositiveIntegers = [78]
export const genericPositiveIntegersIncludingZero = [
  0,
  ...genericPositiveIntegers,
]
export const genericNegativeIntegers = [-90]
export const genericNegativeIntegersIncludingZero = [
  0,
  ...genericNegativeIntegers,
]
export const genericPositiveDecimals = [44.7]
export const genericPositiveDecimalsIncludingZero = [
  0,
  ...genericPositiveDecimals,
]
export const genericNegativeDecimals = [-0.4]
export const genericNegativeDecimalsIncludingZero = [
  0,
  ...genericNegativeDecimals,
]
export const genericDecimals = [-99.8, 0.6]
export const genericNegativeNumbers = [
  ...genericNegativeDecimals,
  ...genericNegativeIntegers,
]
export const genericPositiveNumbers = [
  ...genericPositiveDecimals,
  ...genericPositiveIntegers,
]

export const genericNegativeNumbersIncludingZero = [
  0,
  ...genericNegativeDecimals,
  ...genericNegativeIntegers,
]

export const genericPositiveNumbersIncludingZero = [
  0,
  ...genericPositiveDecimalsIncludingZero,
  ...genericPositiveIntegersIncludingZero,
]
export const positiveRemValues = [`163rem`, `555rem`]
export const positiveEmValues = [`163em`, `555em`]
export const positivePixelValues = [`163px`, `555px`]
export const positiveDimensionValues = [
  ...positiveEmValues,
  ...positiveRemValues,
  ...positivePixelValues,
]

export const negativePixelValues = [`-163px`]
export const negativeRemValuesOrZero = [`0rem`, `-163rem`]
export const negativeEmValuesOrZero = [`0em`, `-163em`]
export const negativePixelValuesOrZero = [`0px`, `-163px`]
export const negativeDimensionValuesOrZero = [
  ...negativeEmValuesOrZero,
  ...negativeRemValuesOrZero,
  ...negativePixelValuesOrZero,
]
export const positiveResolutionValues = [`111dpi`]
export const negativeResolutionValuesIncludingZero = [`0dpi`, `-163dpi`]
export const genericAspectRatioValues = [
  `16/9`,
  `1/1`,
  `6/4`,
  `16 / 9`,
  `1 / 1`,
  `6 / 4`,
]
export const invalidAspectRatioValues = [
  `0/9`,
  `1/0`,
  `0/0`,
  `-16/9`,
  `1/-1`,
  `-6/-`,
]

export const genericResolutionValues = [
  ...positiveResolutionValues,
  ...negativeResolutionValuesIncludingZero,
]

export const genericNumbers = [
  ...genericDecimals,
  ...genericNegativeIntegers,
  ...genericPositiveIntegersIncludingZero,
]

export const genericValues = [
  ...invalidValuesNotUndefined,
  ...genericStrings,
  ...genericNumbers,
]

export const genericValuesNotNull = [
  ...invalidValuesNotNull,
  ...genericStrings,
  ...genericNumbers,
]

// -----------------------------------------------------------------------------
// Breakpoint Sets
// -----------------------------------------------------------------------------

export const validDimensionBreakpoints = {
  small: 400,
  medium: `900px`,
  large: `68.75rem`,
  xLarge: `81.25em`,
}

export const validResolutionBreakpoints = {
  small: 72,
  medium: `150dpi`,
  large: 300,
  xLarge: `600dpi`,
}

export const validAspectRatioBreakpoints = {
  small: `2/3`,
  medium: `1/1`,
  large: `3/2`,
  xLarge: `16/9`,
}

export const validColorBreakpoints = {
  small: 1,
  medium: 4,
  large: 5,
  xLarge: 6,
}

export const validMonochromeBreakpoints = {
  small: 0,
  medium: 4,
  large: 8,
  xLarge: 16,
}

export const validBreakpointSets = {
  width: validDimensionBreakpoints,
  height: validDimensionBreakpoints,
  resolution: validResolutionBreakpoints,
  aspectRatio: validAspectRatioBreakpoints,
  color: validColorBreakpoints,
  colorIndex: validColorBreakpoints,
  monochrome: validMonochromeBreakpoints,
}

// -----------------------------------------------------------------------------
// Breakpoint Sets
// -----------------------------------------------------------------------------

export const validBreakpointsForRange = name => {
  const camelisedName = camelcase(name)
  const o = {}
  o[camelisedName] = validBreakpointSets[camelisedName]
  return o
}

export const mqWithValidBreakpointsForRange = (name, config = {}) =>
  styledMQ.configure(validBreakpointsForRange(name), config)

export const validBreakpointKeysForRange = name => {
  const camelisedName = camelcase(name)
  return keys(validBreakpointsForRange(name)[camelisedName])
}

export const mqWithTweakedBreakpointsForRange = name =>
  styledMQ
    .configure(validBreakpointsForRange(name))
    .tweak({ width: { alpha: 300 } })

export const mqWithNoBreakpoints = () => styledMQ.configure()
