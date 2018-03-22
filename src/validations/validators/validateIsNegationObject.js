import {
  validateRequiredKeys,
  andValidator,
  validateIsPlainObject,
} from 'folktale-validations'

export default andValidator(
  validateIsPlainObject,
  validateRequiredKeys([`not`])
)
