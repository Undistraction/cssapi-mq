import { matchWithSuccessOrFailure, toArgsObj } from 'folktale-validations'
import { compose, prop } from 'ramda'
import validateAPINot from '../validations/validators/args/validateAPINot'
import { throwAPINotError } from '../errors2'
import { renderNotQueryDefinition } from '../renderers/cssRenderers/queryRenderer'

export default defaultMediaType => (...elements) =>
  compose(
    matchWithSuccessOrFailure(
      compose(
        renderNotQueryDefinition(defaultMediaType),
        prop(`elements`),
        prop(`value`)
      ),
      compose(throwAPINotError, prop(`value`))
    ),
    validateAPINot
  )(
    toArgsObj({
      elements,
    })
  )
