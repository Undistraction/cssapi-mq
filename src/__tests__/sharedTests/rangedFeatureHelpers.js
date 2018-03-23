import { compose, sequence, of, flip, repeat, filter, map } from 'ramda'

import {
  mqWithValidBreakpointsForRange,
  validBreakpointKeysForRange,
  mqWithNoBreakpoints,
} from '../testHelpers/data'

const permutations = compose(sequence(of), flip(repeat))
const filterIfPairSame = filter(pair => pair[0] !== pair[1])

export const queryThrowsIfMissingBreakpoint = (name, method) => {
  it(`throws if breakpoint doesn't exist`, () => {
    expect(() => mqWithValidBreakpointsForRange(name)[method](`xxxx`))
      .toThrowMultiline(`
        [cssapi-mq] ${method}() There is no '${name}' breakpoint defined called 'xxxx', only: 'small', 'medium', 'large', 'xLarge' are defined
    `)
  })
}

export const queryThrowsIfMissingBreakpointSet = (name, method) => {
  it(`throws if breakpoint set doesn't exist`, () => {
    const mq = mqWithNoBreakpoints()
    expect(() => mq[method](`xxxx`)).toThrowMultiline(`
      [cssapi-mq] ${method}() This mq object was not configured with a breakpoint set for '${name}'
    `)
  })
}

export const queryReturnsCorrectValueSingleBreakpoint = (name, method) => {
  map(breakpointName => {
    it(`returns the correct query for breakpoint '${breakpointName}'`, () => {
      const mq = mqWithValidBreakpointsForRange(name)
      const result = mq[method](breakpointName)
      expect(result).toMatchSnapshot()
    })
  })(validBreakpointKeysForRange(name))
}

export const queryReturnsCorrectValueWithTwoBreakpoints = (name, method) => {
  const possibleBreakpointCombinations = filterIfPairSame(
    permutations(2, validBreakpointKeysForRange(name))
  )
  map(breakpointNames => {
    it(`returns the correct query for breakpoints '${
      breakpointNames[0]
    }' and '${breakpointNames[1]}'`, () => {
      const result = mqWithValidBreakpointsForRange(name)[method](
        ...breakpointNames
      )
      expect(result).toMatchSnapshot()
    })
  })(possibleBreakpointCombinations)
}

export const queryThrowsWithBothBreakpointsTheSame = (name, method) => {
  it(`throws if 'from' and 'to' breakpoints are the same value`, () => {
    expect(() => mqWithValidBreakpointsForRange(name)[method](`large`, `large`))
      .toThrowMultiline(`
        [cssapi-mq] ${method}() You must supply two different breakpoints but both were: 'large'.
      `)
  })
}

export const queryThrowsIfMissingEitherBreakpoint = (name, method) => {
  it(`throws if 'from' breakpoint doesn't exist`, () => {
    expect(() => mqWithValidBreakpointsForRange(name)[method](`xxxx`, `large`))
      .toThrowMultiline(`
        [cssapi-mq] ${method}() There is no '${name}' breakpoint defined called 'xxxx', only: 'small', 'medium', 'large', 'xLarge' are defined
  `)
  })

  it(`throws if 'to' breakpoint doesn't exist`, () => {
    expect(() => mqWithValidBreakpointsForRange(name)[method](`large`, `xxxx`))
      .toThrowMultiline(`
      [cssapi-mq] ${method}() There is no '${name}' breakpoint defined called 'xxxx', only: 'small', 'medium', 'large', 'xLarge' are defined`)
  })
}
