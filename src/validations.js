import {
  __,
  compose,
  both,
  complement,
  contains,
  isEmpty,
  values,
  all,
  gt,
  toPairs,
  map,
} from 'ramda';
import { MEDIA_TYPES, UNITS, BREAKPOINT_MAP_NAMES } from './const';
import { ensureArray, isNumber, isObject, isBoolean } from './utils';
import {
  throwError,
  invalidBreakpointNamesErrorMessage,
  emptyBreakpointSetErrorMessage,
  noUnitAllowedUnitErrorMessage,
  invalidBaseFontSizeErrorMessage,
  invalidDefaultMediaTypeErrorMessage,
  invalidUnitErrorMessage,
  shouldSeparateQueriesErrorMessage,
} from './errors';

const breakpointsWereSupplied = both(complement(isEmpty), isObject);
const breakpointValuesAreValid = compose(all(isNumber), values);
const baseFontSizeIsValid = both(isNumber, gt(__, 0));
const mediaTypeIsValid = contains(__, values(MEDIA_TYPES));
const breakpointMapNameIsValid = contains(__, values(BREAKPOINT_MAP_NAMES));
const unitIsValid = contains(__, values(UNITS));
// Validate a map of breakpoint sets.
const breakpointMapNamesAreValid = all(t => breakpointMapNameIsValid(t));
// Validate a set of breakpoints.
const validateBreakpointSet = (name, breakpoints) => {
  if (!breakpointsWereSupplied(breakpoints))
    throwError(emptyBreakpointSetErrorMessage(name));

  if (!breakpointValuesAreValid(breakpoints))
    throwError(noUnitAllowedUnitErrorMessage(values(breakpoints)));
};

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

export const mediaTypesAreValid = all(t => mediaTypeIsValid(t));

export const validateBreakpointMapNames = breakpointMap => {
  if (!breakpointMap || !breakpointMapNamesAreValid(breakpointMap)) {
    throwError(invalidBreakpointNamesErrorMessage(breakpointMap));
  }
};

export const validateBreakpointSets = compose(
  map(([name, value]) => validateBreakpointSet(name, value)),
  toPairs
);

export const validateConfig = ({
  baseFontSize,
  defaultMediaType,
  unit,
  shouldSeparateQueries,
}) => {
  if (!baseFontSizeIsValid(baseFontSize))
    throwError(invalidBaseFontSizeErrorMessage(baseFontSize));

  if (!mediaTypesAreValid(ensureArray(defaultMediaType)))
    throwError(invalidDefaultMediaTypeErrorMessage(defaultMediaType));

  if (!unitIsValid(unit)) {
    throwError(invalidUnitErrorMessage(unit));
  }

  if (!isBoolean(shouldSeparateQueries)) {
    throwError(shouldSeparateQueriesErrorMessage());
  }
};
