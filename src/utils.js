import {
  __,
  inc,
  is,
  divide,
  contains,
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
import { css } from 'styled-components';
import { UNITS, MEDIA_PREFIX, SEPARATOR_VALUES } from './const';

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

export const isBoolean = is(Boolean);
export const isNumber = is(Number);
export const isObject = is(Object);
export const isString = is(String);

export const propEqName = propEq('name');
export const ensureArray = when(isString, mediaTypes => [mediaTypes]);

export const appendUnit = (value, unit) => `${value}${unit}`;

export const toBreakpointArray = compose(
  map(zipObj(['name', 'value'])),
  toPairs
);

export const separatorValueForUnit = unit => SEPARATOR_VALUES[unit];

export const unitIsRemOrEm = contains(__, [UNITS.EM, UNITS.REM]);

export const orderByValue = compose(reverse, sort(prop('value')));

const findBreakpointIndex = (breakpoint, breakpointsArray) =>
  findIndex(propEqName(breakpoint))(breakpointsArray);

export const getUpperLimit = (breakpointsArray, breakpoint) => {
  const index = findBreakpointIndex(breakpoint, breakpointsArray);
  return compose(prop('name'), nth(inc(index)))(breakpointsArray);
};

export const toOutput = (unit, baseFontSize, value) =>
  appendUnit(unitIsRemOrEm(unit) ? divide(value, baseFontSize) : value, unit);
