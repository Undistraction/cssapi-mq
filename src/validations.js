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
import { ensureArray } from './utils';

import { isNumber, isObject, isBoolean, isRatioString } from './utils/value';
import {
  throwError,
  emptyBreakpointMapErrorMessage,
  emptyBreakpointSetErrorMessage,
  invalidBreakpointNamesErrorMessage,
  invalidBreakpointValueErrorMessage,
  invalidBaseFontSizeErrorMessage,
  invalidDefaultMediaTypeErrorMessage,
  invalidUnitErrorMessage,
  shouldSeparateQueriesErrorMessage,
  invalidFeatureErrorMessage,
  invalidMediaTypeErrorMessage,
} from './errors';

const isPopulatedObject = both(complement(isEmpty), isObject);
const isBaseFontSizeValid = both(isNumber, gt(__, 0));
const isMediaTypeValid = contains(__, values(MEDIA_TYPES));
const isBreakpointMapNameValid = contains(__, values(BREAKPOINT_MAP_NAMES));
const isDimensionsUnitValid = contains(__, values(UNITS.DIMENSIONS));

const validationsByFeature = {
  width: isNumber,
  height: isNumber,
  resolution: isNumber,
  aspectRatio: isRatioString,
};

// Validate a map of breakpoint sets.
const breakpointMapNamesAreValid = all(t => isBreakpointMapNameValid(t));
// Validate a set of breakpoints.
const validateBreakpointSet = (name, breakpoints) => {
  if (!isPopulatedObject(breakpoints))
    throwError(emptyBreakpointSetErrorMessage(name));
  if (!compose(all(validationsByFeature[name]), values)(breakpoints))
    throwError(invalidBreakpointValueErrorMessage(values(breakpoints)));
};

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

export const areMediaTypesValid = all(t => isMediaTypeValid(t));

export const validateMediaTypes = mediaTypes => {
  if (!areMediaTypesValid(mediaTypes)) {
    throwError(invalidMediaTypeErrorMessage(mediaTypes));
  }
};

export const validateBreakpointMapNames = breakpointMap => {
  if (!breakpointMap || !breakpointMapNamesAreValid(breakpointMap)) {
    throwError(invalidBreakpointNamesErrorMessage(breakpointMap));
  }
};

export const validateBreakpoints = breakpoints => {
  if (!isPopulatedObject(breakpoints))
    throwError(emptyBreakpointMapErrorMessage());

  validateBreakpointMapNames(breakpoints);
};

export const validateBreakpointSets = compose(
  map(([name, value]) => validateBreakpointSet(name, value)),
  toPairs
);

export const validateConfig = ({
  baseFontSize,
  defaultMediaType,
  dimensionsUnit,
  shouldSeparateQueries,
}) => {
  if (!isBaseFontSizeValid(baseFontSize))
    throwError(invalidBaseFontSizeErrorMessage(baseFontSize));

  if (!areMediaTypesValid(ensureArray(defaultMediaType)))
    throwError(invalidDefaultMediaTypeErrorMessage(defaultMediaType));

  if (!isDimensionsUnitValid(dimensionsUnit)) {
    throwError(invalidUnitErrorMessage(dimensionsUnit));
  }

  if (!isBoolean(shouldSeparateQueries)) {
    throwError(shouldSeparateQueriesErrorMessage());
  }
};

export const validateFeature = (name, value, possibleValues) => {
  if (!contains(__, values(possibleValues))(value))
    throwError(invalidFeatureErrorMessage(name, value, possibleValues));
};
