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
  unless,
  anyPass,
  either,
  curry,
  always,
} from 'ramda';
import { rangedFeatureNamed, rangedFeatureNames } from './features';
import { ensureArray } from './utils/array';
import {
  isBoolean,
  isPopulatedObject,
  isPositiveNumber,
  isPositiveNumberWithPixelUnit,
  isObject,
  isArray,
  isNull,
  doesListIncludeValue,
  isDimensionsUnitValid,
  areMediaTypesValid,
} from './utils/predicates';
import {
  composeError,
  invalidBreakpointsErrorMessage,
  emptyBreakpointMapErrorMessage,
  emptyBreakpointSetErrorMessage,
  invalidBreakpointNamesErrorMessage,
  invalidBreakpointSetValueErrorMessage,
  invalidBaseFontSizeErrorMessage,
  invalidDefaultMediaTypeErrorMessage,
  invalidDimensionsUnitErrorMessage,
  shouldSeparateQueriesErrorMessage,
  invalidFeatureErrorMessage,
  invalidMediaTypeErrorMessage,
} from './errors';

const isBreakpointSetNameValid = contains(__, rangedFeatureNames);
const areBreakpointSetNamesValid = all(isBreakpointSetNameValid);

const validate = (predicate, errorMessage) => value => {
  unless(predicate, composeError(errorMessage))(value);
};

// Validate a map of breakpoint sets.

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

const validateBreakpointSetValues = (name, breakpointSet) => {
  const { validator } = rangedFeatureNamed(name);

  validate(
    compose(all(validator.validate), values),
    compose(
      curry(invalidBreakpointSetValueErrorMessage)(validator.message),
      values
    )
  )(breakpointSet);
};

const validateBreakpointSetObject = (name, breakpointSet) => {
  validate(isPopulatedObject, always(emptyBreakpointSetErrorMessage(name)))(
    breakpointSet
  );
};

// Validate a set of breakpoints.
const validateBreakpointSet = (name, breakpointSet) => {
  validateBreakpointSetObject(name, breakpointSet);
  validateBreakpointSetValues(name, breakpointSet);
};

export const validateMediaTypes = validate(
  areMediaTypesValid,
  invalidMediaTypeErrorMessage
);

const validateBreakpointSetNames = validate(
  compose(areBreakpointSetNamesValid, keys),
  invalidBreakpointNamesErrorMessage
);

const validateBreakpointObject = breakpointMap => {
  validate(both(complement(isArray), isObject), invalidBreakpointsErrorMessage)(
    breakpointMap
  );

  validate(isPopulatedObject, emptyBreakpointMapErrorMessage)(breakpointMap);
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
  validate(
    either(isPositiveNumber, isPositiveNumberWithPixelUnit),
    invalidBaseFontSizeErrorMessage
  )(baseFontSize);

  validate(
    anyPass([isNull, compose(areMediaTypesValid, ensureArray)]),
    invalidDefaultMediaTypeErrorMessage
  )(defaultMediaType);

  validate(isDimensionsUnitValid, invalidDimensionsUnitErrorMessage)(
    dimensionsUnit
  );
  validate(isBoolean, shouldSeparateQueriesErrorMessage)(shouldSeparateQueries);
};

export const validateFeature = (name, possibleValues, value) => {
  validate(
    doesListIncludeValue(possibleValues),
    invalidFeatureErrorMessage(name, possibleValues)
  )(value);
};
