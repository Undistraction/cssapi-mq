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
} from 'ramda';

import { numericPartOfUnitedNumber } from './units';

export const isBoolean = is(Boolean);
export const isNumber = both(is(Number), complement(equals(NaN)));
export const isObject = is(Object);
export const isString = is(String);
export const isNull = value => value === null;
export const isUndefined = value => value === undefined;

export const isPopulatedObject = both(complement(isEmpty), isObject);
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
export const isNumberWithPixelUnit = isNumberWithUnit(['px']);

export const isPositiveNumberWithPixelUnit = both(
  isNumberWithPixelUnit,
  compose(isPositiveNumber, numericPartOfUnitedNumber)
);

export const isNumberWithDimensionsUnit = isNumberWithUnit(['rem', 'em', 'px']);
export const isNumberWithResolutionUnit = isNumberWithUnit(['dpi']);

export const isPositiveNumberWithResolutionUnit = both(
  isNumberWithResolutionUnit,
  compose(isPositiveNumber, numericPartOfUnitedNumber)
);
export const isPositiveNumberWithDimensionsUnit = both(
  isNumberWithDimensionsUnit,
  compose(isPositiveNumber, numericPartOfUnitedNumber)
);
