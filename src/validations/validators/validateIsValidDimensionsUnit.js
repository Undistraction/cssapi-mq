import { values } from 'ramda'
import { validateIsWhitelistedValue } from 'folktale-validations'
import { DIMENSIONS_UNITS } from '../../const'

export default validateIsWhitelistedValue(values(DIMENSIONS_UNITS))
