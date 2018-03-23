import {
  matchWithSuccessOrFailure,
  toArgsObj,
  fromArgsObj,
} from 'folktale-validations'
import { compose, prop, apply } from 'ramda'
import api from './api'
import validateMQArgs from './validations/validators/args/validateMQArgs'
import { throwConfigureError } from './errors2'

export default (breakpoints, config, originalMQ) =>
  compose(
    matchWithSuccessOrFailure(
      compose(
        apply(api),
        fromArgsObj([`breakpoints`, `config`, `originalMQ`]),
        prop(`value`)
      ),
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
