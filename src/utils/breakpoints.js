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
  isNil,
  isEmpty,
} from 'ramda'

import { throwError, missingBreakpointErrorMessage } from '../errors'

import { throwMissingBreakpointSetErrorMessage } from '../errors2'

const NAME = `name`
const VALUE = `value`

export const propEqName = propEq(NAME)
export const propName = prop(NAME)

const zipToNameAndValue = zipObj([NAME, VALUE])

const findBreakpointIndex = (breakpoint, breakpointsArray) =>
  findIndex(propEqName(breakpoint))(breakpointsArray)

export const toBreakpointArray = compose(map(zipToNameAndValue), toPairs)

export const getUpperLimit = breakpointsArray => breakpoint => {
  const index = findBreakpointIndex(breakpoint, breakpointsArray)
  return compose(propName, nth(inc(index)))(breakpointsArray)
}

export const getBreakpointNamed = (
  featureName,
  methodName,
  breakpointSet
) => breakpointName => {
  if (isEmpty(breakpointSet)) throwMissingBreakpointSetErrorMessage(featureName)
  const value = breakpointSet[breakpointName]
  if (isNil(value))
    throwError(
      missingBreakpointErrorMessage(breakpointName, featureName, breakpointSet)
    )
  return value
}
