import { anyOfValidator } from 'folktale-validations'
import validateIsRem from './validateIsRem'
import validateIsEm from './validateIsEm'
import validateIsPx from './validateIsPx'
import validateIsNonNegativeValidNumber from './validateIsNonNegativeValidNumber'

export default anyOfValidator([
  validateIsNonNegativeValidNumber,
  validateIsRem,
  validateIsEm,
  validateIsPx,
])
