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
  unless,
  anyPass,
  either,
  curry,
  always,
} from 'ramda';
import { MEDIA_TYPES, UNITS } from './const';
import { rangedFeatureNames } from './features';
import { ensureArray } from './utils/array';

import {
  isBoolean,
  isPopulatedObject,
  isPositiveNumber,
  isPositiveNumberWithPixelUnit,
  isObject,
  isArray,
  isNull,
} from './utils/value';
import {
  throwError,
  composeError,
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
const areBreakpointSetNamesValid = all(isBreakpointSetNameValid);
const isDimensionsUnitValid = contains(__, values(UNITS.DIMENSIONS));
const areMediaTypesValid = both(all(isMediaTypeValid), complement(isEmpty));
const doesListIncludeValue = list => contains(__, values(list));

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

  unless(
    compose(all(getValidatorForFeature(name).validate), values),
    compose(
      throwError,
      curry(invalidBreakpointSetValueErrorMessage)(validator.message),
      values
    )
  )(breakpointSet);
};

const validateBreakpointSetObject = (name, breakpointSet) => {
  unless(
    isPopulatedObject,
    composeError(always(emptyBreakpointSetErrorMessage(name)))
  )(breakpointSet);
};

// Validate a set of breakpoints.
const validateBreakpointSet = (name, breakpointSet) => {
  validateBreakpointSetObject(name, breakpointSet);
  validateBreakpointSetValues(name, breakpointSet);
};

export const validateMediaTypes = mediaTypes => {
  unless(areMediaTypesValid, composeError(invalidMediaTypeErrorMessage))(
    mediaTypes
  );
};

const validateBreakpointSetNames = breakpointMap => {
  unless(
    compose(areBreakpointSetNamesValid, keys),
    composeError(invalidBreakpointNamesErrorMessage)
  )(breakpointMap);
};

const validateBreakpointObject = breakpointMap => {
  unless(
    both(complement(isArray), isObject),
    composeError(invalidBreakpointsErrorMessage)
  )(breakpointMap);

  unless(isPopulatedObject, composeError(emptyBreakpointMapErrorMessage))(
    breakpointMap
  );
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
  unless(
    either(isPositiveNumber, isPositiveNumberWithPixelUnit),
    composeError(invalidBaseFontSizeErrorMessage)
  )(baseFontSize);

  unless(
    anyPass([isNull, compose(areMediaTypesValid, ensureArray)]),
    composeError(invalidDefaultMediaTypeErrorMessage)
  )(defaultMediaType);

  unless(isDimensionsUnitValid, composeError(invalidUnitErrorMessage))(
    dimensionsUnit
  );

  unless(isBoolean, composeError(shouldSeparateQueriesErrorMessage))(
    shouldSeparateQueries
  );
};

export const validateFeature = (name, value, possibleValues) => {
  unless(
    doesListIncludeValue(possibleValues),
    composeError(invalidFeatureErrorMessage(name, possibleValues))
  )(value);
};
