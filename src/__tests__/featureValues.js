import {
  junkValuesNotNull,
  genericValues,
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
