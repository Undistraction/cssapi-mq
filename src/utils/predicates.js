import {
  __,
  compose,
  gte,
  both,
  complement,
  isEmpty,
  values,
  contains,
  flip,
  all,
} from 'ramda';
import {
  isValidNumber,
  isValidPositiveNumber,
  isNumberWithUnit,
  isNumberWithDpi,
  numericPartOfUnitedNumber,
} from 'cssjs-units';

import { isObj } from 'ramda-adjunct';

import { DIMENSIONS_UNITS, MEDIA_TYPES } from '../const';

export const isPopulatedObject = both(complement(isEmpty), isObj);
export const isPositiveNumberOrZero = both(isValidNumber, gte(__, 0));
export const isPositiveInteger = both(isValidPositiveNumber, Number.isInteger);
export const isPositiveIntegerOrZero = both(
  isPositiveNumberOrZero,
  Number.isInteger
);

export const isNumericPartOfUnitValuePositive = compose(
  isValidPositiveNumber,
  numericPartOfUnitedNumber
);
export const isPositiveNumberWithPixelUnit = both(
  isNumberWithUnit([DIMENSIONS_UNITS.PX]),
  isNumericPartOfUnitValuePositive
);
export const isNumberWithDimensionsUnit = isNumberWithUnit(
  values(DIMENSIONS_UNITS)
);
export const isPositiveNumberWithResolutionUnit = both(
  isNumberWithDpi,
  isNumericPartOfUnitValuePositive
);
export const isPositiveNumberWithDimensionsUnit = both(
  isNumberWithDimensionsUnit,
  isNumericPartOfUnitValuePositive
);
export const doesListIncludeValue = list => contains(__, values(list));
export const isDimensionsUnitValid = contains(__, values(DIMENSIONS_UNITS));
export const isMediaTypeValid = flip(contains)(values(MEDIA_TYPES));
export const areMediaTypesValid = both(
  all(isMediaTypeValid),
  complement(isEmpty)
);
