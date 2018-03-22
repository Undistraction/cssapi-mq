import { matchWithSuccessOrFailure } from 'folktale-validations'
import { compose, prop, values, apply } from 'ramda'
import api from './api'
import validateMQArgs from './validations/validators/validateMQArgs'
import { throwConfigureError } from './errors2'
import { toArgsObj } from './utils/args'

export default (breakpoints, config, originalMQ) =>
  compose(
    matchWithSuccessOrFailure(
      compose(apply(api), values, prop(`value`)),
      compose(throwConfigureError, prop(`value`))
    ),
    validateMQArgs
  )(
    toArgsObj({
      breakpoints,
      config,
      originalMQ,
    })
  )
