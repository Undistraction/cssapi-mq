import {
  inc,
  compose,
  map,
  zipObj,
  prop,
  sort,
  toPairs,
  reverse,
  findIndex,
  propEq,
  nth,
  when,
} from 'ramda';

import { isString } from './utils/value';

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

export const propEqName = propEq('name');
export const ensureArray = when(isString, mediaTypes => [mediaTypes]);

export const toBreakpointArray = compose(
  map(zipObj(['name', 'value'])),
  toPairs
);

export const orderByValue = compose(reverse, sort(prop('value')));

const findBreakpointIndex = (breakpoint, breakpointsArray) =>
  findIndex(propEqName(breakpoint))(breakpointsArray);

export const getUpperLimit = (breakpointsArray, breakpoint) => {
  const index = findBreakpointIndex(breakpoint, breakpointsArray);
  return compose(prop('name'), nth(inc(index)))(breakpointsArray);
};
