import {
  __,
  compose,
  both,
  complement,
  contains,
  values,
  all,
  toPairs,
  map,
  keys,
  flip,
  isEmpty,
  either,
} from 'ramda';
import { MEDIA_TYPES, UNITS } from './const';
import { rangedFeatureNames } from './features';
import { ensureArray } from './utils';

import {
  isBoolean,
  isPopulatedObject,
  isPositiveNumber,
  isPositiveNumberWithPixelUnit,
  isObject,
  isArray,
  isNaN,
} from './utils/value';
import {
  throwError,
  invalidBreakpointsErrorMessage,
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

import dimensionValidator from './validators/features/dimensionValidator';
import resolutionValidator from './validators/features/resolutionValidator';
import aspectRatioValidator from './validators/features/aspectRatioValidator';
import colorValidator from './validators/features/colorValidator';
import monochromeValidator from './validators/features/monochromeValidator';

const isMediaTypeValid = flip(contains)(values(MEDIA_TYPES));
const isBreakpointSetNameValid = contains(__, rangedFeatureNames);
const areBreakpointSetNamesValid = v => {
  const a = all(t => {
    return isBreakpointSetNameValid(t);
  })(v);
  return a;
};
const isDimensionsUnitValid = contains(__, values(UNITS.DIMENSIONS));
const doesListIncludeValue = list => complement(contains(__, values(list)));

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

export const areMediaTypesValid = both(
  all(isMediaTypeValid),
  complement(isEmpty)
);

export const validateMediaTypes = mediaTypes => {
  if (!areMediaTypesValid(mediaTypes)) {
    throwError(invalidMediaTypeErrorMessage(mediaTypes));
  }
};

const validateBreakpointSetNames = breakpointMap => {
  if (!areBreakpointSetNamesValid(keys(breakpointMap))) {
    throwError(invalidBreakpointNamesErrorMessage(breakpointMap));
  }
};

const validateBreakpointObject = breakpointMap => {
  if (
    isNaN(breakpointMap) ||
    isArray(breakpointMap) ||
    !isObject(breakpointMap)
  ) {
    throwError(invalidBreakpointsErrorMessage(breakpointMap));
  }

  if (!isPopulatedObject(breakpointMap))
    throwError(emptyBreakpointMapErrorMessage(breakpointMap));
};

export const validateBreakpointMap = v => {
  validateBreakpointObject(v);
  validateBreakpointSetNames(v);
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
  if (!either(isPositiveNumber, isPositiveNumberWithPixelUnit)(baseFontSize))
    throwError(invalidBaseFontSizeErrorMessage(baseFontSize));
  if (
    defaultMediaType !== null &&
    !areMediaTypesValid(ensureArray(defaultMediaType))
  )
    throwError(invalidDefaultMediaTypeErrorMessage(defaultMediaType));

  if (!isDimensionsUnitValid(dimensionsUnit)) {
    throwError(invalidUnitErrorMessage(dimensionsUnit));
  }

  if (!isBoolean(shouldSeparateQueries)) {
    throwError(shouldSeparateQueriesErrorMessage(shouldSeparateQueries));
  }
};

export const validateFeature = (name, value, possibleValues) => {
  if (doesListIncludeValue(possibleValues)(value))
    throwError(invalidFeatureErrorMessage(name, value, possibleValues));
};
