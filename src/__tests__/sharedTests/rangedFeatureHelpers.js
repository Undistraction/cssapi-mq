import { compose, sequence, of, flip, repeat, filter } from 'ramda';

import {
  mqWithValidBreakpointsForRange,
  validBreakpointKeysForRange,
  mqWithNoBreakpoints,
} from '../data';

const permutations = compose(sequence(of), flip(repeat));
const filterIfPairSame = filter(pair => pair[0] !== pair[1]);

export const queryThrowsIfMissingBreakpoint = (name, method) => {
  it("throws if breakpoint doesn't exist", () => {
    expect(() =>
      mqWithValidBreakpointsForRange(name)[method]('xxxx')
    ).toThrowErrorMatchingSnapshot();
  });
};

export const queryThrowsIfMissingBreakpointSet = (name, method) => {
  it("throws if breakpoint set doesn't exist", () => {
    expect(() =>
      mqWithNoBreakpoints()[method]('xxxx')
    ).toThrowErrorMatchingSnapshot();
  });
};

export const queryReturnsCorrectValueSingleBreakpoint = (name, method) => {
  for (const breakpointName of validBreakpointKeysForRange(name)) {
    it(`returns the correct query for breakpoint '${breakpointName}'`, () => {
      const result = mqWithValidBreakpointsForRange(name)[method](
        breakpointName
      );
      expect(result).toMatchSnapshot();
    });
  }
};

export const queryReturnsCorrectValueWithTwoBreakpoints = (name, method) => {
  const possibleBreakpointCombinations = filterIfPairSame(
    permutations(2, validBreakpointKeysForRange(name))
  );
  for (const breakpointNames of possibleBreakpointCombinations) {
    it(`returns the correct query for breakpoints '${
      breakpointNames[0]
    }' and '${breakpointNames[1]}'`, () => {
      const result = mqWithValidBreakpointsForRange(name)[method](
        ...breakpointNames
      );
      expect(result).toMatchSnapshot();
    });
  }
};

export const queryThrowsWithBothBreakpointsTheSame = (name, method) => {
  it("throws if 'from' and 'to' breakpoints are the same value", () => {
    expect(() =>
      mqWithValidBreakpointsForRange(name)[method]('large', 'large')
    ).toThrowErrorMatchingSnapshot();
  });
};

export const queryThrowsIfMissingEitherBreakpoint = (name, method) => {
  it("throws if 'from' breakpoint doesn't exist", () => {
    expect(() =>
      mqWithValidBreakpointsForRange(name)[method]('xxxx', 'large')
    ).toThrowErrorMatchingSnapshot();
  });

  it("throws if 'to' breakpoint doesn't exist", () => {
    expect(() =>
      mqWithValidBreakpointsForRange(name)[method]('large', 'xxxx')
    ).toThrowErrorMatchingSnapshot();
  });
};
