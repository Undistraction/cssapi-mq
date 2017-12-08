import {
  __,
  is,
  compose,
  gt,
  gte,
  test,
  join,
  curry,
  both,
  complement,
  isEmpty,
  equals,
  values,
  contains,
  flip,
  all,
} from 'ramda';

import { isObj } from 'ramda-adjunct';

import { numericPartOfUnitedNumber } from './units';
import { DIMENSIONS_UNITS, RESOLUTION_UNIT, MEDIA_TYPES } from '../const';

export const isNumber = both(is(Number), complement(equals(NaN)));

export const isPopulatedObject = both(complement(isEmpty), isObj);
export const isRatioString = test(/^[1-9]+[0-9]* ?\/ ?[1-9]+[0-9]*$/);
export const isPositiveNumber = both(isNumber, gt(__, 0));
export const isPositiveNumberOrZero = both(isNumber, gte(__, 0));
export const isPositiveInteger = both(isPositiveNumber, Number.isInteger);
export const isPositiveIntegerOrZero = both(
  isPositiveNumberOrZero,
  Number.isInteger
);
export const isNumberWithUnit = curry((units, value) => {
  const regex = `^-?\\d+(?:.\\d+)?(?:${join('|', units)})$`;
  return new RegExp(regex).test(value);
});
export const isNumericPartOfUnitValuePositive = compose(
  isPositiveNumber,
  numericPartOfUnitedNumber
);
export const isPositiveNumberWithPixelUnit = both(
  isNumberWithUnit([DIMENSIONS_UNITS.PX]),
  isNumericPartOfUnitValuePositive
);
export const isNumberWithDimensionsUnit = isNumberWithUnit(
  values(DIMENSIONS_UNITS)
);
export const isNumberWithResolutionUnit = isNumberWithUnit([RESOLUTION_UNIT]);
export const isPositiveNumberWithResolutionUnit = both(
  isNumberWithResolutionUnit,
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
