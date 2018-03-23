import { compose, prop } from 'ramda'
import { matchWithSuccessOrFailure, toArgsObj } from 'folktale-validations'
import { renderFeature } from '../renderers/cssRenderers/queryRenderer'
import { throwAPILinearFeatureError } from '../errors2'
import validatorForLinearFeature from '../validations/validatorForLinearFeature'

export default (name, possibleValues, allowNoArgument = false) => value =>
  compose(
    matchWithSuccessOrFailure(
      compose(renderFeature(name), prop(`value`), prop(`value`)),
      compose(throwAPILinearFeatureError(name), prop(`value`))
    ),
    validatorForLinearFeature(possibleValues, !allowNoArgument)
  )(toArgsObj({ value }))
