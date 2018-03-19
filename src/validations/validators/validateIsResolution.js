import { anyOfValidator } from 'folktale-validations'
import validateIsDPI from './validateIsDPI'
import validateIsPositiveValidNumber from './validateIsPositiveValidNumber'

export default anyOfValidator([validateIsPositiveValidNumber, validateIsDPI])
