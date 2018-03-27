import { keys, compose, curry, map } from 'ramda'
import { toCommaSeparatedList } from './utils/string'

const wrapWithQuotes = map(v => `'${v}'`)
const keysToCommaSeparatedList = compose(
  toCommaSeparatedList,
  wrapWithQuotes,
  keys
)

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

export const throwError = message => {
  throw new Error(message)
}

export const missingBreakpointErrorMessage = curry(
  (name, breakpointMapName, breakpoints) =>
    `There is no '${breakpointMapName}' breakpoint defined called '${name}', only: ${keysToCommaSeparatedList(
      breakpoints
    )} are defined`
)

export const sameBreakpointsForBetweenErrorMessage = name =>
  `You must supply two different breakpoints but both were: '${name}'.`
