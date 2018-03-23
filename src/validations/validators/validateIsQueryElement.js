import { isArray } from 'ramda-adjunct'
import {
  validateIsArray,
  validateArrayElements,
  anyOfValidator,
  validateIsString,
  untilFailureValidator,
  whenValidator,
} from 'folktale-validations'
import validateIsNegationObject from './validateIsNegationObject'

export default untilFailureValidator([
  anyOfValidator([validateIsString, validateIsArray, validateIsNegationObject]),
  whenValidator(isArray, validateArrayElements(validateIsString)),
])
