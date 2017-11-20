import { __, partial, both, always, subtract, when } from 'ramda';
import { separatorValueForUnit, appendUnit } from '../units';
import { UNITS } from '../const';

const prepareUnitlessValue = (shouldSeparateQueries, unit, shouldSeparate) => {
  return when(
    both(always(shouldSeparate), always(shouldSeparateQueries)),
    subtract(__, separatorValueForUnit(unit))
  );
};

export default ({ shouldSeparateQueries = true } = {}) => ({
  prepare: partial(prepareUnitlessValue, [
    shouldSeparateQueries,
    UNITS.RESOLUTION.DPI,
  ]),
  toUnit: value => appendUnit(value, UNITS.RESOLUTION.DPI),
});
