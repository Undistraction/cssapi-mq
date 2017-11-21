import { __, divide, contains } from 'ramda';
import { UNITS, SEPARATOR_VALUES } from '../const';

export const separatorValueForUnit = unit => SEPARATOR_VALUES[unit];

export const appendUnit = (value, unit) => `${value}${unit}`;

export const unitIsRemOrEm = contains(__, [
  UNITS.DIMENSIONS.EM,
  UNITS.DIMENSIONS.REM,
]);

export const toDimensionOutput = (unit, baseFontSize, value) =>
  appendUnit(unitIsRemOrEm(unit) ? divide(value, baseFontSize) : value, unit);
