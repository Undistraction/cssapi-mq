import { always } from 'ramda'
import VALIDATOR_UIDS from './validatorUIDs'

const {
  VALIDATE_IS_ASPECT_RATIO_STRING,
  VALIDATE_IS_NEGATION_OBJECT,
} = VALIDATOR_UIDS

const messages = {
  [VALIDATE_IS_ASPECT_RATIO_STRING]: always(
    `must be an aspect ratio string, in the form of two positive integers separated by a forward slash, for example '16/9'`
  ),
  [VALIDATE_IS_NEGATION_OBJECT]: always(`Wasn't negation (not) object`),
}

export default messages
