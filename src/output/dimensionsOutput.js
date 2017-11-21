import { __, partial, both, always, subtract, when } from 'ramda';
import { toDimensionOutput, separatorValueForUnit } from '../utils/units';
import { UNITS } from '../const';

const toUnit = (dimensionsUnit, baseFontSize) =>
  partial(toDimensionOutput, [dimensionsUnit, baseFontSize]);

const prepareUnitlessValue = (
  shouldSeparateQueries,
  dimensionsUnit,
  shouldSeparate
) =>
  when(
    both(always(shouldSeparate), always(shouldSeparateQueries)),
    subtract(__, separatorValueForUnit(dimensionsUnit))
  );

export default (
  {
    baseFontSize = 16,
    dimensionsUnit = UNITS.DIMENSIONS.EM,
    shouldSeparateQueries = true,
  } = {}
) => ({
  prepare: partial(prepareUnitlessValue, [
    shouldSeparateQueries,
    dimensionsUnit,
  ]),
  toUnit: toUnit(dimensionsUnit, baseFontSize),
});
