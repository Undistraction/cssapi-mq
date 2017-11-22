import { __, partial, always, subtract, when } from 'ramda';
import { toDimensionOutput, separatorValueForUnit } from '../utils/units';
import { UNITS } from '../const';

const toUnit = (dimensionsUnit, baseFontSize) =>
  partial(toDimensionOutput, [dimensionsUnit, baseFontSize]);

const prepareUnitlessValue = (value, shouldSeparateQueries, dimensionsUnit) =>
  when(
    always(shouldSeparateQueries),
    subtract(__, separatorValueForUnit(dimensionsUnit))
  )(value);

export default (
  {
    baseFontSize = 16,
    dimensionsUnit = UNITS.DIMENSIONS.EM,
    shouldSeparateQueries = true,
  } = {}
) => (value, shouldSeparate) => {
  const preparedValue = prepareUnitlessValue(
    value,
    shouldSeparateQueries && shouldSeparate,
    dimensionsUnit
  );
  return toUnit(dimensionsUnit, baseFontSize)(preparedValue);
};
