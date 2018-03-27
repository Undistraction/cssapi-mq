import { orValidator } from 'folktale-validations'
import validateIsPx from './validateIsPx'
import validateIsNonNegativeValidNumber from './validateIsNonNegativeValidNumber'

export default orValidator(validateIsNonNegativeValidNumber, validateIsPx)
