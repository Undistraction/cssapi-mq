import testRangedQueries from './helpers/testRangedQueries';
import cssSerialiser from './helpers/cssSerialiser';
import { RANGED_FEATURES } from '../features';

import {
  queryThrowsIfMissingBreakpoint,
  queryReturnsCorrectValueSingleBreakpoint,
  queryReturnsCorrectValueWithTwoBreakpoints,
  queryThrowsIfMissingEitherBreakpoint,
  queryThrowsWithBothBreakpointsTheSame,
} from './sharedTests/queries';

expect.addSnapshotSerializer(cssSerialiser);

const singleArgumentSharedTest = [
  queryThrowsIfMissingBreakpoint,
  queryReturnsCorrectValueSingleBreakpoint,
];

for (const feature of RANGED_FEATURES) {
  testRangedQueries(feature.name, {
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
