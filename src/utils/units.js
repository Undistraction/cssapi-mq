import { __, divide, multiply, contains } from 'ramda';
import { UNITS, SEPARATOR_VALUES } from '../const';

export const separatorValueForUnit = unit => SEPARATOR_VALUES[unit];

export const appendUnit = (value, unit) => `${value}${unit}`;

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

export const numericPartOfUnitedNumber = value => {
  const captures = /^(-?\d+(?:.\d+)?)([a-z]+)?$/.exec(value);
  if (!captures || !captures[1]) {
    throw new Error(`You can't get the numeric portion of '${value}'`);
  }
  return Number(captures[1]);
};

export const unitPartOfUnitedNumber = value => {
  const captures = /^(-?\d+(?:.\d+)?)([a-z]+)?$/.exec(value);
  if (!captures || !captures[2]) {
    throw new Error(`You can't get the unit portion of '${value}'`);
  }
  return captures[2];
};

export const unitedDimensionToUnitlessPixelValue = (value, baseFontSize) => {
  const number = numericPartOfUnitedNumber(value);
  const unit = unitPartOfUnitedNumber(value);
  if (unitIsRemOrEm(unit)) return remOrEmToPxValue(number, baseFontSize);
  return number;
};

export const unitedResolutionToUnitlessValue = value =>
  numericPartOfUnitedNumber(value);
