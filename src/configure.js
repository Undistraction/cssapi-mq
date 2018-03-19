import { matchWithSuccessOrFailure } from 'folktale-validations'
import { compose, prop, values, apply } from 'ramda'
import api from './api'
import validateMQArgs from './validations/validators/validateMQArgs'
import { throwConfigureError } from './errors2'
import { pickIsNotUndefined } from './utils/object'

const propValue = prop(`value`)

// Don't expand config vars as we need to pass a single config object around.
export default (breakpoints, config, originalMQ) =>
  compose(
    matchWithSuccessOrFailure(
      compose(apply(api), values, propValue),
      compose(throwConfigureError, propValue)
    ),
    validateMQArgs,
    pickIsNotUndefined
  )({
    breakpoints,
    config,
    originalMQ,
  })
