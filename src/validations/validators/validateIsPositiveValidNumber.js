import {
  andValidator,
  validateIsValidNumber,
  validateIsPositive,
} from 'folktale-validations'

export default andValidator(validateIsValidNumber, validateIsPositive)
