import {
  __,
  divide,
  multiply,
  contains,
  join,
  view,
  compose,
  lensIndex,
  isNil,
  none,
  complement,
} from 'ramda';
import { UNITS, SEPARATOR_VALUES } from '../const';

export const separatorValueForUnit = unit => SEPARATOR_VALUES[unit];

export const appendUnit = (value, unit) => join('', [value, unit]);

export const unitIsRemOrEm = contains(__, [
  UNITS.DIMENSIONS.EM,
  UNITS.DIMENSIONS.REM,
]);

export const pxToRemOrEmValue = (value, baseFontSize) =>
  divide(value, baseFontSize);

export const remOrEmToPxValue = (value, baseFontSize) =>
  multiply(value, baseFontSize);

export const toDimensionOutput = (unit, baseFontSize, value) =>
  appendUnit(
    unitIsRemOrEm(unit) ? pxToRemOrEmValue(value, baseFontSize) : value,
    unit
  );

export const elementsOfUnitedNumber = value => {
  const captures = /^(-?\d+(?:.\d+)?)([a-z]+)?$/.exec(value);
  if (none(complement(isNil), [captures, captures[1], captures[2]])) {
    throw new Error(`You can't get the numeric portion of '${value}'`);
  }
  return [Number(captures[1]), captures[2]];
};

export const numericPartOfUnitedNumber = compose(
  view(lensIndex(0)),
  elementsOfUnitedNumber
);

export const unitPartOfUnitedNumber = compose(
  view(lensIndex(1)),
  elementsOfUnitedNumber
);

export const unitedDimensionToUnitlessPixelValue = (value, baseFontSize) => {
  const [number, unit] = elementsOfUnitedNumber(value);
  return unitIsRemOrEm(unit) ? remOrEmToPxValue(number, baseFontSize) : number;
};

export const unitedResolutionToUnitlessValue = value =>
  numericPartOfUnitedNumber(value);
