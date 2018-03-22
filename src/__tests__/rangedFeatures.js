import {
  configSeparatesValuesWhenSet,
  configOutputsConfiguredDimensionUnits,
} from './sharedTests/config'
import {
  featureThrowsForMissingBreakpointSet,
  featureReturnsCorrectValueForBreakpoint,
  featureThrowsForMissingArgument,
  featureReturnsCorrectValueForValidExpicitValue,
  featureThrowsForInvalidExplicitBreakpoint,
  featureReturnsCorrectValueNoArguments,
  featureThrowsForInvalidBreakpoint,
} from './sharedTests/features'
import cssSerialiser from './helpers/cssSerialiser'
import testRangedFeature from './helpers/testRangedFeature'
import featureValues from './testHelpers/featureValues'

expect.addSnapshotSerializer(cssSerialiser)

// Tests common to features that support explicit values
const explicitValueTests = [
  featureReturnsCorrectValueForValidExpicitValue,
  featureThrowsForInvalidExplicitBreakpoint,
]

// Tests common to all ranged features
const sharedTests = {
  value: [
    featureThrowsForMissingBreakpointSet,
    featureReturnsCorrectValueForBreakpoint,
    featureThrowsForInvalidBreakpoint,
    ...explicitValueTests,
  ],
  minValue: [
    featureThrowsForMissingBreakpointSet,
    featureReturnsCorrectValueForBreakpoint,
    featureThrowsForMissingArgument,
    featureThrowsForInvalidBreakpoint,
    ...explicitValueTests,
  ],
  maxValue: [
    featureThrowsForMissingBreakpointSet,
    featureReturnsCorrectValueForBreakpoint,
    featureThrowsForMissingArgument,
    featureThrowsForInvalidBreakpoint,
    ...explicitValueTests,
  ],
}

// Tests common to features that support separation of breakpoints
const separationTests = [configSeparatesValuesWhenSet]

describe(`ranged features`, () => {
  // Range
  testRangedFeature(`width`, {
    tests: {
      value: [
        ...sharedTests.value,
        ...explicitValueTests,
        ...separationTests,
        configOutputsConfiguredDimensionUnits,
        featureThrowsForMissingArgument,
      ],
      minValue: [
        ...sharedTests.minValue,
        ...explicitValueTests,
        ...separationTests,
        configOutputsConfiguredDimensionUnits,
        featureThrowsForMissingArgument,
      ],
      maxValue: [
        ...sharedTests.maxValue,
        ...explicitValueTests,
        ...separationTests,
        configOutputsConfiguredDimensionUnits,
        featureThrowsForMissingArgument,
      ],
    },
    ...featureValues(`width`),
  })

  testRangedFeature(`height`, {
    tests: {
      value: [
        ...sharedTests.value,
        ...explicitValueTests,
        ...separationTests,
        configOutputsConfiguredDimensionUnits,
        featureThrowsForMissingArgument,
      ],
      minValue: [
        ...sharedTests.minValue,
        ...explicitValueTests,
        ...separationTests,
        configOutputsConfiguredDimensionUnits,
        featureThrowsForMissingArgument,
      ],
      maxValue: [
        ...sharedTests.maxValue,
        ...explicitValueTests,
        ...separationTests,
        ...explicitValueTests,
        configOutputsConfiguredDimensionUnits,
      ],
    },
    ...featureValues(`height`),
  })

  testRangedFeature(`resolution`, {
    tests: {
      value: [
        ...sharedTests.value,
        ...separationTests,
        ...explicitValueTests,
        featureThrowsForMissingArgument,
      ],
      minValue: [
        ...sharedTests.minValue,
        ...separationTests,
        ...explicitValueTests,
        featureThrowsForMissingArgument,
      ],
      maxValue: [
        ...sharedTests.maxValue,
        ...separationTests,
        ...explicitValueTests,
        featureThrowsForMissingArgument,
      ],
    },
    ...featureValues(`resolution`),
  })

  testRangedFeature(`aspect-ratio`, {
    tests: {
      value: [...sharedTests.value, featureThrowsForMissingArgument],
      minValue: [...sharedTests.minValue, featureThrowsForMissingArgument],
      maxValue: [...sharedTests.maxValue, featureThrowsForMissingArgument],
    },
    ...featureValues(`aspectRatio`),
  })

  testRangedFeature(`color`, {
    tests: {
      value: [...sharedTests.value, featureReturnsCorrectValueNoArguments],
      minValue: [...sharedTests.minValue, featureThrowsForMissingArgument],
      maxValue: [...sharedTests.maxValue, featureThrowsForMissingArgument],
    },
    ...featureValues(`color`),
    allowNoArgument: true,
  })

  testRangedFeature(`color-index`, {
    tests: {
      value: [...sharedTests.value, featureReturnsCorrectValueNoArguments],
      minValue: [...sharedTests.minValue, featureThrowsForMissingArgument],
      maxValue: [...sharedTests.maxValue, featureThrowsForMissingArgument],
    },
    ...featureValues(`colorIndex`),
    allowNoArgument: true,
  })

  testRangedFeature(`monochrome`, {
    tests: {
      value: [...sharedTests.value, featureReturnsCorrectValueNoArguments],
      minValue: [...sharedTests.minValue, featureThrowsForMissingArgument],
      maxValue: [...sharedTests.maxValue, featureThrowsForMissingArgument],
    },
    ...featureValues(`monochrome`),
    allowNoArgument: true,
  })
})
