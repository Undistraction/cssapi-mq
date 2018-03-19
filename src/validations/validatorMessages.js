import { always } from 'ramda'
import validatorUIDs from './validatorUIDs'

const { VALIDATE_IS_ASPECT_RATIO_STRING } = validatorUIDs

const messages = {
  [VALIDATE_IS_ASPECT_RATIO_STRING]: always(
    `must be an aspect ratio string, in the form of two positive integers separated by a forward slash, for example '16/9'`
  ),
}

export default messages
