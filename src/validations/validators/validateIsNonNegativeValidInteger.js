import {
  allOfValidator,
  validateIsValidNumber,
  validateIsInteger,
  validateIsNonNegative,
} from 'folktale-validations'

export default allOfValidator([
  validateIsValidNumber,
  validateIsInteger,
  validateIsNonNegative,
])
