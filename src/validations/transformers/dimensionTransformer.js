import { always, compose, when, curry, flip, subtract, partial } from 'ramda'
import { outputWithUnit } from 'cssjs-units'
import { unitedDimensionToUnitlessPixelValue } from 'cssapi-units'
import { separatorValueForUnit } from '../../utils/units'
import { isNumberWithDimensionsUnit } from '../../utils/predicates'
import { UNITS } from '../../const'

const toUnit = (dimensionsUnit, baseFontSize) =>
  partial(outputWithUnit, [dimensionsUnit, baseFontSize])

export default ({
  baseFontSize = 16,
  dimensionsUnit = UNITS.DIMENSIONS.EM,
  shouldSeparateQueries = true,
  canSeparateQueries = false,
} = {}) => value =>
  compose(
    toUnit(dimensionsUnit, baseFontSize),
    when(
      always(canSeparateQueries && shouldSeparateQueries),
      flip(subtract)(separatorValueForUnit(dimensionsUnit))
    ),
    when(
      isNumberWithDimensionsUnit,
      curry(flip(unitedDimensionToUnitlessPixelValue))(baseFontSize)
    )
  )(value)
