import { __, partial, always, subtract, when } from 'ramda';
import {
  toDimensionOutput,
  separatorValueForUnit,
  remOrEmToPxValue,
  unitIsRemOrEm,
} from '../utils/units';
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
  const captures = /^(-?\d+(?:.\d+)?)(rem|em|px)?$/.exec(value);
  const valueOnly = captures[1];
  const unit = captures[2];

  let unitlessValue = captures ? valueOnly : value;

  if (captures && unitIsRemOrEm(unit)) {
    unitlessValue = remOrEmToPxValue(valueOnly);
  }

  const preparedValue = prepareUnitlessValue(
    unitlessValue,
    shouldSeparateQueries && shouldSeparate,
    dimensionsUnit
  );
  return toUnit(dimensionsUnit, baseFontSize)(preparedValue);
};
