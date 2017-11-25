import testRangedFeatureHelpers from './helpers/testRangedFeatureHelpers';
import cssSerialiser from './helpers/cssSerialiser';
import { RANGED_FEATURES } from '../features';

import {
  queryThrowsIfMissingBreakpoint,
  queryReturnsCorrectValueSingleBreakpoint,
  queryReturnsCorrectValueWithTwoBreakpoints,
  queryThrowsIfMissingEitherBreakpoint,
  queryThrowsWithBothBreakpointsTheSame,
} from './sharedTests/rangedFeatureHelpers';

expect.addSnapshotSerializer(cssSerialiser);

const singleArgumentSharedTest = [
  queryThrowsIfMissingBreakpoint,
  queryReturnsCorrectValueSingleBreakpoint,
];

describe('ranged feature helpers', () => {
  for (const feature of RANGED_FEATURES) {
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
    });
  }
});
