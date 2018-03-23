import {
  validateRequiredKeys,
  untilFailureValidator,
  validateIsPlainObject,
  decorateValidator,
} from 'folktale-validations'
import validatorUIDs from '../validatorUIDs'

export default decorateValidator(
  validatorUIDs.VALIDATE_IS_NEGATION_OBJECT,
  untilFailureValidator([validateIsPlainObject, validateRequiredKeys([`not`])])
)
