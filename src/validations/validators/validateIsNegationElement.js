import { isArray } from 'ramda-adjunct'
import {
  validateIsArray,
  validateArrayElements,
  anyOfValidator,
  validateIsString,
  untilFailureValidator,
  whenValidator,
} from 'folktale-validations'

export default untilFailureValidator([
  anyOfValidator([validateIsString, validateIsArray]),
  whenValidator(isArray, validateArrayElements(validateIsString)),
])
