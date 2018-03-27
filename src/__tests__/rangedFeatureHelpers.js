import { map } from 'ramda'
import testRangedFeatureHelpers from './testHelpers/testRangedFeatureHelpers'
import cssSerialiser from './testHelpers/cssSerialiser'
import { RANGED_FEATURES } from '../features'

import {
  queryThrowsIfMissingBreakpoint,
  queryThrowsIfMissingBreakpointSet,
  queryReturnsCorrectValueSingleBreakpoint,
  queryReturnsCorrectValueWithTwoBreakpoints,
  queryThrowsIfMissingEitherBreakpoint,
  queryThrowsWithBothBreakpointsTheSame,
} from './sharedTests/rangedFeatureHelpers'

// Add serialiser for generating readable snapshots from CSS
expect.addSnapshotSerializer(cssSerialiser)

const singleArgumentSharedTest = [
  queryThrowsIfMissingBreakpoint,
  queryThrowsIfMissingBreakpointSet,
  queryReturnsCorrectValueSingleBreakpoint,
]

describe(`ranged feature helpers`, () => {
  map(feature => {
    testRangedFeatureHelpers(feature.name, {
      tests: {
        above: [...singleArgumentSharedTest],
        below: [...singleArgumentSharedTest],
        between: [
          queryReturnsCorrectValueWithTwoBreakpoints,
          queryThrowsIfMissingEitherBreakpoint,
          queryThrowsWithBothBreakpointsTheSame,
        ],
        at: [...singleArgumentSharedTest],
        atBreakpoint: [...singleArgumentSharedTest],
      },
    })
  })(RANGED_FEATURES)
})
