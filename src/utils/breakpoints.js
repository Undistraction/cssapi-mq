import {
  inc,
  compose,
  map,
  zipObj,
  prop,
  toPairs,
  findIndex,
  propEq,
  nth,
} from 'ramda'

// -----------------------------------------------------------------------------
// Internal
// -----------------------------------------------------------------------------

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

export const propEqName = propEq(`name`)
const propName = prop(`name`)
const zipToNameAndValue = zipObj([`name`, `value`])
// TODO: This should be internal
const findBreakpointIndex = (breakpoint, breakpointsArray) =>
  findIndex(propEqName(breakpoint))(breakpointsArray)

export const toBreakpointArray = compose(map(zipToNameAndValue), toPairs)

export const getUpperLimit = (breakpointsArray, breakpoint) => {
  const index = findBreakpointIndex(breakpoint, breakpointsArray)
  return compose(propName, nth(inc(index)))(breakpointsArray)
}
