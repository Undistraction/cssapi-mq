import { __, always, subtract, when } from 'ramda';
import {
  appendUnit,
  numericPartOfUnitedNumber,
  isNumberWithDpi,
} from 'js-css-units';
import { separatorValueForUnit } from '../../utils/units';
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
  if (isNumberWithDpi(value)) {
    value = numericPartOfUnitedNumber(value);
  }

  const preparedValue = prepareUnitlessValue(
    value,
    shouldSeparateQueries && shouldSeparate,
    UNITS.RESOLUTION.DPI
  );

  return appendUnit(preparedValue, UNITS.RESOLUTION.DPI);
};
