import { __, always, subtract, when } from 'ramda';
import {
  separatorValueForUnit,
  appendUnit,
  unitedResolutionToUnitlessValue,
} from '../../utils/units';
import { isNumberWithResolutionUnit } from '../../utils/predicates';
import { UNITS } from '../../const';

const prepareUnitlessValue = (value, shouldSeparateQueries, unit) =>
  when(
    always(shouldSeparateQueries),
    subtract(__, separatorValueForUnit(unit))
  )(value);

export default ({ shouldSeparateQueries = true } = {}) => (
  value,
  shouldSeparate
) => {
  if (isNumberWithResolutionUnit(value)) {
    value = unitedResolutionToUnitlessValue(value);
  }

  const preparedValue = prepareUnitlessValue(
    value,
    shouldSeparateQueries && shouldSeparate,
    UNITS.RESOLUTION.DPI
  );

  return appendUnit(preparedValue, UNITS.RESOLUTION.DPI);
};
