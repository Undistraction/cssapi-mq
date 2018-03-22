import { isUndefined } from 'ramda-adjunct'
import { compose, prop, objOf, both, always, ifElse } from 'ramda'
import { matchWithSuccessOrFailure } from 'folktale-validations'
import { renderFeature } from '../renderers/cssRenderers/queryRenderer'
import { throwAPILinearFeatureError } from '../errors2'
import validatorForLinearFeature from '../validations/validatorForLinearFeature'

export default (name, possibleValues, allowNoArgument = false) => value =>
  compose(
    matchWithSuccessOrFailure(
      compose(renderFeature(name), prop(`value`), prop(`value`)),
      compose(throwAPILinearFeatureError(name), prop(`value`))
    ),
    validatorForLinearFeature(possibleValues, !allowNoArgument),
    ifElse(
      both(isUndefined, always(allowNoArgument)),
      always({}),
      objOf(`value`)
    )
  )(value)
