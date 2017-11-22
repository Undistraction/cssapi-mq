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
  and,
} from 'ramda';
import { MEDIA_TYPES, UNITS, BREAKPOINT_MAP_NAMES } from './const';
import { ensureArray } from './utils';

import { isNumber, isObject, isBoolean } from './utils/value';
import {
  throwError,
  emptyBreakpointMapErrorMessage,
  emptyBreakpointSetErrorMessage,
  invalidBreakpointNamesErrorMessage,
  invalidBreakpointSetValueErrorMessage,
  invalidBaseFontSizeErrorMessage,
  invalidDefaultMediaTypeErrorMessage,
  invalidUnitErrorMessage,
  shouldSeparateQueriesErrorMessage,
  invalidFeatureErrorMessage,
  invalidMediaTypeErrorMessage,
} from './errors';

import dimensionValidator from './validators/dimensionValidator';
import resolutionValidator from './validators/resolutionValidator';
import aspectRatioValidator from './validators/aspectRatioValidator';
import colorValidator from './validators/colorValidator';
import monochromeValidator from './validators/monochromeValidator';

const isPopulatedObject = both(complement(isEmpty), isObject);
const isBaseFontSizeValid = both(isNumber, gt(__, 0));
const isMediaTypeValid = contains(__, values(MEDIA_TYPES));
const isBreakpointSetNameValid = contains(__, values(BREAKPOINT_MAP_NAMES));
const isDimensionsUnitValid = contains(__, values(UNITS.DIMENSIONS));
const includesValue = list => complement(contains(__, values(list)));

export const validatorsByFeature = {
  width: dimensionValidator,
  height: dimensionValidator,
  resolution: resolutionValidator,
  aspectRatio: aspectRatioValidator,
  color: colorValidator,
  colorIndex: colorValidator,
  monochrome: monochromeValidator,
};

// Validate a map of breakpoint sets.
const breakpointSetNamesAreValid = all(t => isBreakpointSetNameValid(t));

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

export const getValidatorForFeature = feature => validatorsByFeature[feature];

const validateBreakpointSetValues = (name, breakpointSet) => {
  const validator = validatorsByFeature[name];
  if (
    !compose(all(getValidatorForFeature(name).validate), values)(breakpointSet)
  )
    throwError(
      invalidBreakpointSetValueErrorMessage(
        validator.message,
        values(breakpointSet)
      )
    );
};

// Validate a set of breakpoints.
const validateBreakpointSet = (name, breakpointSet) => {
  if (!isPopulatedObject(breakpointSet))
    throwError(emptyBreakpointSetErrorMessage(name));
  validateBreakpointSetValues(name, breakpointSet);
};

export const areMediaTypesValid = all(t => isMediaTypeValid(t));

export const validateMediaTypes = mediaTypes => {
  if (!areMediaTypesValid(mediaTypes)) {
    throwError(invalidMediaTypeErrorMessage(mediaTypes));
  }
};

export const validateBreakpointSetNames = breakpointMap => {
  if (!breakpointSetNamesAreValid(breakpointMap)) {
    throwError(invalidBreakpointNamesErrorMessage(breakpointMap));
  }
};

const validateBreakpointsMap = breakpointMap => {
  if (!isPopulatedObject(breakpointMap))
    throwError(emptyBreakpointMapErrorMessage(breakpointMap));
};

export const validateBreakpoints = and(
  validateBreakpointSetNames,
  validateBreakpointsMap
);

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
  if (includesValue(possibleValues)(value))
    throwError(invalidFeatureErrorMessage(name, value, possibleValues));
};
