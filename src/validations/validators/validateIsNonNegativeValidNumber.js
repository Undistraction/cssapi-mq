import {
  andValidator,
  validateIsValidNumber,
  validateIsNonNegative,
} from 'folktale-validations'

export default andValidator(validateIsValidNumber, validateIsNonNegative)
