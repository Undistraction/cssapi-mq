import { isNumberWithDpi } from 'cssapi-units'
import { always, compose, when, flip, subtract } from 'ramda'
import { numericPartOfUnitedNumber, appendUnit } from 'cssjs-units'
import { separatorValueForUnit } from '../../utils/units'
import { UNITS } from '../../const'

const toUnit = flip(appendUnit)(UNITS.RESOLUTION.DPI)

export default ({
  shouldSeparateQueries = true,
  canSeparateQueries = false,
} = {}) => value =>
  compose(
    toUnit,
    when(
      always(canSeparateQueries && shouldSeparateQueries),
      flip(subtract)(separatorValueForUnit(UNITS.RESOLUTION.DPI))
    ),
    when(isNumberWithDpi, numericPartOfUnitedNumber)
  )(value)
