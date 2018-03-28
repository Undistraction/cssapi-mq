import { compose, prop, mergeDeepLeft } from 'ramda'
import { matchWithSuccessOrFailure, toArgsObj } from 'folktale-validations'
import configure from '../mq'
import { throwAPITweakError } from '../errors2'
import validateAPITweak from '../validations/validators/args/validateAPITweak'

export default (mq, breakpoints, config) => tweakpoints =>
  compose(
    matchWithSuccessOrFailure(
      compose(
        v => configure(v, config, mq),
        mergeDeepLeft(breakpoints),
        prop(`tweakpoints`),
        prop(`value`)
      ),
      compose(throwAPITweakError, prop(`value`))
    ),
    validateAPITweak
  )(
    toArgsObj({
      tweakpoints,
    })
  )
