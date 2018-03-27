import { values } from 'ramda'
import {
  orValidator,
  validateIsNull,
  validateIsWhitelistedValue,
} from 'folktale-validations'
import { MEDIA_TYPES } from '../../const'

export default orValidator(
  validateIsWhitelistedValue(values(MEDIA_TYPES)),
  validateIsNull
)
