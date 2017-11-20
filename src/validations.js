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
import {
  MEDIA_TYPES,
  UNITS,
  BREAKPOINT_MAP_NAMES,
  ORIENTATIONS,
  SCANS,
} from './const';
import {
  ensureArray,
  isNumber,
  isObject,
  isBoolean,
  isRatioString,
} from './utils';
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
  invalidOrientationErrorMessage,
  invalidScanErrorMessage,
} from './errors';

const populatedObject = both(complement(isEmpty), isObject);
const baseFontSizeIsValid = both(isNumber, gt(__, 0));
const mediaTypeIsValid = contains(__, values(MEDIA_TYPES));
const breakpointMapNameIsValid = contains(__, values(BREAKPOINT_MAP_NAMES));
const orientationIsValid = contains(__, values(ORIENTATIONS));
const scanIsValid = contains(__, values(SCANS));
const dimensionsUnitIsValid = contains(__, values(UNITS.DIMENSIONS));

const validationsByFeature = {
  width: isNumber,
  height: isNumber,
  resolution: isNumber,
  aspectRatio: isRatioString,
};

// Validate a map of breakpoint sets.
const breakpointMapNamesAreValid = all(t => breakpointMapNameIsValid(t));
// Validate a set of breakpoints.
const validateBreakpointSet = (name, breakpoints) => {
  if (!populatedObject(breakpoints))
    throwError(emptyBreakpointSetErrorMessage(name));
  if (!compose(all(validationsByFeature[name]), values)(breakpoints))
    throwError(invalidBreakpointValueErrorMessage(values(breakpoints)));
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

export const validateBreakpoints = breakpoints => {
  if (!populatedObject(breakpoints))
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
  if (!baseFontSizeIsValid(baseFontSize))
    throwError(invalidBaseFontSizeErrorMessage(baseFontSize));

  if (!mediaTypesAreValid(ensureArray(defaultMediaType)))
    throwError(invalidDefaultMediaTypeErrorMessage(defaultMediaType));

  if (!dimensionsUnitIsValid(dimensionsUnit)) {
    throwError(invalidUnitErrorMessage(dimensionsUnit));
  }

  if (!isBoolean(shouldSeparateQueries)) {
    throwError(shouldSeparateQueriesErrorMessage());
  }
};

export const validateOrientation = origin => {
  if (!orientationIsValid(origin))
    throwError(invalidOrientationErrorMessage(origin));
};

export const validateScan = scan => {
  if (!scanIsValid(scan)) throwError(invalidScanErrorMessage(scan));
};
