import {
  __,
  is,
  compose,
  gte,
  test,
  join,
  curry,
  both,
  complement,
  isEmpty,
} from 'ramda';

export const isBoolean = is(Boolean);
export const isNumber = is(Number);
export const isObject = is(Object);
export const isString = is(String);

export const isPopulatedObject = both(complement(isEmpty), isObject);
export const isRatioString = test(/^\d+ ?\/ ?\d+$/); // {number} / {number}
export const isPositiveInteger = compose(gte(__, 0), Number.isInteger);
export const isNumberWithUnit = curry((units, value) => {
  const regex = `^-?\\d+(?:.\\d+)?(?:${join('|', units)})?$`;
  return new RegExp(regex).test(value);
});
export const isNumberWithDimensionsUnit = isNumberWithUnit(['rem', 'em', 'px']);
export const isNumberWithResolutionUnit = isNumberWithUnit(['dpi']);
