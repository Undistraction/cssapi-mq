import { compose, prop, mergeDeepLeft } from 'ramda'
import { matchWithSuccessOrFailure } from 'folktale-validations'
import configure from '../configure'
import { throwAPITweakError } from '../errors2'
import validateAPITweak from '../validations/validators/validateAPITweak'
import { toArgsObj } from '../utils/args'

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
