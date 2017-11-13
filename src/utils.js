import {
  __,
  inc,
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
  subtract,
  when,
  is,
} from 'ramda';
import { css } from 'styled-components';
import { UNITS, MEDIA_PREFIX } from './const';

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

export const ensureArray = when(is(String), mediaTypes => [mediaTypes]);

export const appendUnit = (value, unit) => `${value}${unit}`;

export const ensureBreakpointOrder = (breakpoints, ...args) =>
  sort((a, b) => subtract(prop(a)(breakpoints), prop(b)(breakpoints)))(args);

export const toBreakpointArray = compose(
  map(zipObj(['name', 'value'])),
  toPairs
);

export const unitIsRemOrEm = contains(__, [UNITS.EM, UNITS.REM]);

export const orderByValue = compose(reverse, sort(prop('value')));

export const namePropEquals = propEq('name');

const findBreakpointIndex = (breakpoint, breakpointsArray) =>
  findIndex(namePropEquals(breakpoint))(breakpointsArray);

export const getUpperLimit = (breakpointsArray, breakpoint) => {
  const index = findBreakpointIndex(breakpoint, breakpointsArray);
  return compose(prop('name'), nth(inc(index)))(breakpointsArray);
};

export const buildQueryDefinition = (...elements) =>
  `${MEDIA_PREFIX} ${elements.join(' and ')}`;

export const buildQuery = (definition, content) => css`
  ${definition} {
    ${content};
  }
`;

export const toOutput = (unit, baseFontSize, value) =>
  appendUnit(unitIsRemOrEm(unit) ? divide(value, baseFontSize) : value, unit);
