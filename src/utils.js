import {
  inc,
  is,
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
  test,
} from 'ramda';

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

export const isBoolean = is(Boolean);
export const isNumber = is(Number);
export const isObject = is(Object);
export const isString = is(String);
// {number} / {number}
export const isRatioString = test(/^\d+ ?\/ ?\d+$/);

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
