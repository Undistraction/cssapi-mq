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
  when,
} from 'ramda';

import { isString } from './utils/value';

// -----------------------------------------------------------------------------
// Internal
// -----------------------------------------------------------------------------

const propName = prop('name');
const zipToNameAndValue = zipObj(['name', 'value']);

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

export const propEqName = propEq('name');
export const ensureArray = when(isString, mediaTypes => [mediaTypes]);
export const toBreakpointArray = compose(map(zipToNameAndValue), toPairs);
// TODO: This should be internal
const findBreakpointIndex = (breakpoint, breakpointsArray) =>
  findIndex(propEqName(breakpoint))(breakpointsArray);

export const getUpperLimit = (breakpointsArray, breakpoint) => {
  const index = findBreakpointIndex(breakpoint, breakpointsArray);
  return compose(propName, nth(inc(index)))(breakpointsArray);
};

export const toCommaSeparatedList = values => values.join(', ');
