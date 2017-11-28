import { keys, values, compose } from 'ramda';
import { MEDIA_TYPES, UNITS } from './const';
import { rangedFeatureNames } from './features';
import { toCommaSeparatedList } from './utils';

const keysToCommaSeparatedList = compose(toCommaSeparatedList, keys);
const valuesToCommaSeparatedList = compose(toCommaSeparatedList, values);
const objectToString = JSON.stringify;

// Horrible hackery to get round issues with Babel extending builtins.
// This is the only way to have a custom error.
const InvalidValueError = function(message) {
  const error = new Error(message);
  error.name = 'InvalidValueError';
  this.name = error.name;
  this.message = error.message;
  if (error.stack) this.stack = error.stack;
  this.toString = function() {
    return `${this.name}: ${this.message}`;
  };
};
InvalidValueError.prototype = new Error();
InvalidValueError.prototype.name = 'InvalidValueError';

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

export { InvalidValueError };

export const throwError = message => {
  throw new InvalidValueError(message);
};

export const invalidBreakpointsErrorMessage = breakpoints =>
  `The breakpoints object must be an object, but you supplied '${objectToString(
    breakpoints
  )}'`;

export const emptyBreakpointMapErrorMessage = breakpointMap => `
  You must not supply an empty object of breakpoints 'configure()', but the you supplied '${objectToString(
    breakpointMap
  )}'.`;

export const invalidBreakpointNamesErrorMessage = breakpointMap =>
  `You supplied a breakpoint set with an invalid name. Valid values are: '${
    rangedFeatureNames
  }'. but you supplied: '${objectToString(breakpointMap)}'.`;

export const emptyBreakpointSetErrorMessage = breakpointMapName =>
  `A breakpoint set must contain at least one breakpoint, but you supplied an empty breakpoint map for the '${objectToString(
    breakpointMapName
  )}' map.`;

export const mssingBreakpointMapErrorMessage = name =>
  `There is no breakpoint map for ${name}`;

export const missingBreakpointErrorMessage = (
  name,
  breakpointMapName,
  breakpointMaps
) =>
  `There is no '${breakpointMapName}' breakpoint defined called '${
    name
  }', only: '${keysToCommaSeparatedList(breakpointMaps)}' are defined.`;

export const sameBreakpointsForBetweenErrorMessage = name =>
  `You must supply two different breakpoints to 'widthBetween' but both were: '${
    name
  }'.`;

export const invalidMediaTypeErrorMessage = value =>
  `'mediaType' must be one of '${valuesToCommaSeparatedList(
    MEDIA_TYPES
  )}' but you supplied: '${value}'.`;

export const invalidBreakpointSetValueErrorMessage = (message, breakpoints) =>
  `${message} but you supplied ${objectToString(breakpoints)}`;

export const invalidBaseFontSizeErrorMessage = value =>
  `'baseFontSize' must be a positive number, but you supplied '${value}'`;

export const invalidDefaultMediaTypeErrorMessage = value =>
  `'defaultMediaType' must be one of '${valuesToCommaSeparatedList(
    MEDIA_TYPES
  )}' but was '${value}'.`;

export const invalidUnitErrorMessage = value =>
  `'unit' must be one of '${valuesToCommaSeparatedList(
    UNITS.DIMENSIONS
  )}' but was '${value}'.`;

export const shouldSeparateQueriesErrorMessage = value =>
  `'shouldSeparateQueries' must be a boolean but was '${value}'.`;

export const invalidFeatureErrorMessage = (name, value, possibleValues) => `
  '${name}' must be one of: '${possibleValues}' but was: '${value}'.`;

export const queryNoElementsErrorMessage =
  "You must supply at least one argument to 'query()' to build a valid media query";

export const queryElementIsValidTypeErrorMessage = value =>
  `You must only supply strings or arrays to 'query()' but you supplied '${
    value
  }'`;

export const queryChildElementIsValidTypeErrorMessage = value =>
  `You must only supply strings or arrays as children of arrays passed in to 'query()' but you supplied '${objectToString(
    value
  )}'`;

export const queryNoNestedArraysErrorMessage = value =>
  `You must not supply any nested arrays to 'query()' but you supplied '${
    value
  }'`;
