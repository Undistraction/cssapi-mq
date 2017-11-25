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
  genericNegativeDecimalsIncludingZero,
  positiveResolutionValues,
  genericAspectRatioValues,
  invalidAspectRatioValues,
  genericNegativeNumbers,
  genericNumbers,
} from './data';

const dimensionsValues = {
  invalidNonExplicitValues: [...genericValues, ...positiveDimensionValues],
  invalidExplicitValues: [
    ...invalidValues,
    ...genericStrings,
    ...genericNegativeDecimalsIncludingZero,
    ...genericNegativeIntegers,
  ],
  validExplicitValues: [...genericPositiveIntegers, ...positiveDimensionValues],
};

const colorAndMonochromeValues = {
  invalidNonExplicitValues: [...genericValues],
  invalidExplicitValues: [
    ...junkValuesNotNull,
    ...genericStrings,
    ...genericNegativeIntegers,
    ...genericDecimals,
  ],
  validExplicitValues: [null, ...genericPositiveIntegersIncludingZero],
};

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
      ...genericPositiveIntegersIncludingZero,
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
};

export default featureName => featureValues[featureName];
