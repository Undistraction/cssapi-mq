import { __, partial, always, subtract, when } from 'ramda';
import {
  outputWithUnit,
  unitedDimensionToUnitlessPixelValue,
} from 'cssjs-units';
import { separatorValueForUnit } from '../../utils/units';
import { UNITS } from '../../const';
import { isNumberWithDimensionsUnit } from '../../utils/predicates';

const toUnit = (dimensionsUnit, baseFontSize) =>
  partial(outputWithUnit, [dimensionsUnit, baseFontSize]);

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
