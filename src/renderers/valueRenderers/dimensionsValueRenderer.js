import { __, partial, always, subtract, when } from 'ramda';
import {
  toDimensionOutput,
  separatorValueForUnit,
  unitedDimensionToUnitlessPixelValue,
} from '../../utils/units';
import { UNITS } from '../../const';
import { isNumberWithDimensionsUnit } from '../../utils/value';

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
  if (isNumberWithDimensionsUnit(value)) {
    value = unitedDimensionToUnitlessPixelValue(value, baseFontSize);
  }
  const preparedValue = prepareUnitlessValue(
    value,
    shouldSeparateQueries && shouldSeparate,
    dimensionsUnit
  );
  const x = toUnit(dimensionsUnit, baseFontSize)(preparedValue);
  return x;
};
