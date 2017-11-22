import testRangedQueries from './helpers/testRangedQueries';
import cssSerialiser from './helpers/cssSerialiser';

import {
  queryThrowsIfMissingBreakpoint,
  queryReturnsCorrectValueSingleBreakpoint,
  queryReturnsCorrectValueWithTwoBreakpoints,
  queryThrowsIfMissingEitherBreakpoint,
  queryThrowsWithBothBreakpointsTheSame,
} from './sharedTests/queries';

expect.addSnapshotSerializer(cssSerialiser);

testRangedQueries('width', {
  tests: {
    above: [
      queryThrowsIfMissingBreakpoint,
      queryReturnsCorrectValueSingleBreakpoint,
    ],
    below: [
      queryThrowsIfMissingBreakpoint,
      queryReturnsCorrectValueSingleBreakpoint,
    ],
    between: [
      queryReturnsCorrectValueWithTwoBreakpoints,
      queryThrowsIfMissingEitherBreakpoint,
      queryThrowsWithBothBreakpointsTheSame,
    ],
    at: [
      queryThrowsIfMissingBreakpoint,
      queryReturnsCorrectValueSingleBreakpoint,
    ],
    atBreakpoint: [
      queryThrowsIfMissingBreakpoint,
      queryReturnsCorrectValueSingleBreakpoint,
    ],
  },
});
testRangedQueries('height', {
  tests: {
    above: [
      queryThrowsIfMissingBreakpoint,
      queryReturnsCorrectValueSingleBreakpoint,
    ],
    below: [
      queryThrowsIfMissingBreakpoint,
      queryReturnsCorrectValueSingleBreakpoint,
    ],
    between: [
      queryReturnsCorrectValueWithTwoBreakpoints,
      queryThrowsIfMissingEitherBreakpoint,
      queryThrowsWithBothBreakpointsTheSame,
    ],
    at: [
      queryThrowsIfMissingBreakpoint,
      queryReturnsCorrectValueSingleBreakpoint,
    ],
    atBreakpoint: [
      queryThrowsIfMissingBreakpoint,
      queryReturnsCorrectValueSingleBreakpoint,
    ],
  },
});
testRangedQueries('resolution', {
  tests: {
    above: [
      queryThrowsIfMissingBreakpoint,
      queryReturnsCorrectValueSingleBreakpoint,
    ],
    below: [
      queryThrowsIfMissingBreakpoint,
      queryReturnsCorrectValueSingleBreakpoint,
    ],
    between: [
      queryReturnsCorrectValueWithTwoBreakpoints,
      queryThrowsIfMissingEitherBreakpoint,
      queryThrowsWithBothBreakpointsTheSame,
    ],
    at: [
      queryThrowsIfMissingBreakpoint,
      queryReturnsCorrectValueSingleBreakpoint,
    ],
    atBreakpoint: [
      queryThrowsIfMissingBreakpoint,
      queryReturnsCorrectValueSingleBreakpoint,
    ],
  },
});
testRangedQueries('aspect-ratio', {
  tests: {
    above: [
      queryThrowsIfMissingBreakpoint,
      queryReturnsCorrectValueSingleBreakpoint,
    ],
    below: [
      queryThrowsIfMissingBreakpoint,
      queryReturnsCorrectValueSingleBreakpoint,
    ],
    between: [
      queryReturnsCorrectValueWithTwoBreakpoints,
      queryThrowsIfMissingEitherBreakpoint,
      queryThrowsWithBothBreakpointsTheSame,
    ],
    at: [
      queryThrowsIfMissingBreakpoint,
      queryReturnsCorrectValueSingleBreakpoint,
    ],
    atBreakpoint: [
      queryThrowsIfMissingBreakpoint,
      queryReturnsCorrectValueSingleBreakpoint,
    ],
  },
});

testRangedQueries('color', {
  tests: {
    above: [
      queryThrowsIfMissingBreakpoint,
      queryReturnsCorrectValueSingleBreakpoint,
    ],
    below: [
      queryThrowsIfMissingBreakpoint,
      queryReturnsCorrectValueSingleBreakpoint,
    ],
    between: [
      queryReturnsCorrectValueWithTwoBreakpoints,
      queryThrowsIfMissingEitherBreakpoint,
      queryThrowsWithBothBreakpointsTheSame,
    ],
    at: [
      queryThrowsIfMissingBreakpoint,
      queryReturnsCorrectValueSingleBreakpoint,
    ],
    atBreakpoint: [
      queryThrowsIfMissingBreakpoint,
      queryReturnsCorrectValueSingleBreakpoint,
    ],
  },
});

testRangedQueries('color-index', {
  tests: {
    above: [
      queryThrowsIfMissingBreakpoint,
      queryReturnsCorrectValueSingleBreakpoint,
    ],
    below: [
      queryThrowsIfMissingBreakpoint,
      queryReturnsCorrectValueSingleBreakpoint,
    ],
    between: [
      queryReturnsCorrectValueWithTwoBreakpoints,
      queryThrowsIfMissingEitherBreakpoint,
      queryThrowsWithBothBreakpointsTheSame,
    ],
    at: [
      queryThrowsIfMissingBreakpoint,
      queryReturnsCorrectValueSingleBreakpoint,
    ],
    atBreakpoint: [
      queryThrowsIfMissingBreakpoint,
      queryReturnsCorrectValueSingleBreakpoint,
    ],
  },
});

testRangedQueries('monochrome', {
  tests: {
    above: [
      queryThrowsIfMissingBreakpoint,
      queryReturnsCorrectValueSingleBreakpoint,
    ],
    below: [
      queryThrowsIfMissingBreakpoint,
      queryReturnsCorrectValueSingleBreakpoint,
    ],
    between: [
      queryReturnsCorrectValueWithTwoBreakpoints,
      queryThrowsIfMissingEitherBreakpoint,
      queryThrowsWithBothBreakpointsTheSame,
    ],
    at: [
      queryThrowsIfMissingBreakpoint,
      queryReturnsCorrectValueSingleBreakpoint,
    ],
    atBreakpoint: [
      queryThrowsIfMissingBreakpoint,
      queryReturnsCorrectValueSingleBreakpoint,
    ],
  },
});
