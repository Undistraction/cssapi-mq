import { keys, values } from 'ramda';
import { MEDIA_TYPES, BREAKPOINT_MAP_NAMES } from './const';

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

export const throwError = message => {
  throw new Error(message);
};

export const invalidBreakpointNamesErrorMessage = breakpointMap =>
  `You must supply valid breakpoint map keys. Valid values are: '${
    BREAKPOINT_MAP_NAMES
  }'. but you supplied: '${keys(breakpointMap)}.`;

export const emptyBreakpointSetErrorMessage = breakpointMapName =>
  `A breakpoint set must contain at least one breakpoint, but you supplied an empty breakpoint map for the '${
    breakpointMapName
  }' map.`;

export const missingBreakpointErrorMessage = (breakpoints, name) =>
  `There is no breakpoint defined called '${name}', only: '${keys(
    breakpoints
  )}' are defined.`;

export const sameBreakpointsForBetweenErrorMessage = name =>
  `You must supply two different breakpoints to 'widthBetween' but both were: '${
    name
  }'.`;

export const invalidMediaTypeErrorMessage = value =>
  `You must supply valid media types from: ('${
    MEDIA_TYPES
  }) but you supplied: '${value}'`;

export const noUnitAllowedUnitErrorMessage = breakpoints =>
  `You must supply unitless values for each breakpoint but you supplied ${
    breakpoints
  }`;

export const invalidBaseFontSizeErrorMessage = value =>
  `'baseFontSize' must be a number, but you supplied '${value}'`;

export const invalidDefaultMediaTypeErrorMessage = value =>
  `'defaultMediaType' must be one of '${values(MEDIA_TYPES)}' but was '${
    value
  }'`;

export const invalidUnitErrorMessage = value =>
  `'unit' must be one of '${values(MEDIA_TYPES)}' but was '${value}'`;

export const shouldSeparateQueriesErrorMessage = value =>
  `'shouldSeparateQueries' must be a boolean but was '${value}'`;
