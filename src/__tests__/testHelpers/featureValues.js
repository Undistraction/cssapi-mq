import {
  junkValuesNotNull,
  genericValues,
  invalidValuesNotUndefined,
  invalidValues,
  genericStrings,
  genericPositiveIntegers,
  genericPositiveIntegersIncludingZero,
  genericNegativeIntegers,
  genericDecimals,
  positiveDimensionValues,
  genericResolutionValues,
  negativeResolutionValuesIncludingZero,
  positiveResolutionValues,
  genericAspectRatioValues,
  invalidAspectRatioValues,
  genericNegativeNumbers,
  genericNumbers,
  genericNegativeDecimals,
} from './data'

const dimensionsValues = {
  invalidNonExplicitValues: [...genericValues, ...positiveDimensionValues],
  invalidExplicitValues: [
    ...invalidValues,
    ...genericStrings,
    ...genericNegativeDecimals,
    ...genericNegativeIntegers,
  ],
  validExplicitValues: [
    ...genericPositiveIntegersIncludingZero,
    ...positiveDimensionValues,
  ],
}

const colorAndMonochromeValues = {
  invalidNonExplicitValues: [...genericValues],
  invalidExplicitValues: [
    ...junkValuesNotNull,
    ...genericStrings,
    ...genericNegativeIntegers,
    ...genericDecimals,
  ],
  validExplicitValues: [...genericPositiveIntegersIncludingZero],
}

const featureValues = {
  // Linear
  orientation: {
    invalidValues: genericValues,
  },
  scan: {
    invalidValues: genericValues,
  },
  grid: {
    invalidValues: [
      ...invalidValuesNotUndefined,
      ...genericStrings,
      ...genericNegativeNumbers,
      2,
    ],
  },
  update: {
    invalidValues: [
      ...invalidValuesNotUndefined,
      ...genericStrings,
      ...genericNumbers,
    ],
  },
  overflowBlock: {
    invalidValues: genericValues,
  },
  overflowInline: {
    invalidValues: genericValues,
  },
  colorGamut: {
    invalidValues: genericValues,
  },
  displayMode: {
    invalidValues: genericValues,
  },
  // Ranged
  width: {
    ...dimensionsValues,
  },
  height: {
    ...dimensionsValues,
  },
  resolution: {
    invalidNonExplicitValues: [...genericValues, ...genericResolutionValues],
    invalidExplicitValues: [
      ...invalidValues,
      ...genericStrings,
      ...negativeResolutionValuesIncludingZero,
    ],
    validExplicitValues: [
      ...positiveResolutionValues,
      ...genericPositiveIntegers,
    ],
  },
  aspectRatio: {
    invalidNonExplicitValues: [
      ...genericValues,
      ...genericAspectRatioValues,
      ...invalidAspectRatioValues,
    ],
    invalidExplicitValues: [...genericValues, ...invalidAspectRatioValues],
    validExplicitValues: [...genericAspectRatioValues],
  },
  color: {
    ...colorAndMonochromeValues,
  },
  colorIndex: {
    ...colorAndMonochromeValues,
  },
  monochrome: {
    ...colorAndMonochromeValues,
  },
}

export default featureName => featureValues[featureName]
