import { matchWithSuccessOrFailure } from 'folktale-validations'
import { css } from 'styled-components'
import { compose, prop } from 'ramda'
import { toArgsObj } from '../utils/args'
import validateAPIQuery from '../validations/validators/validateAPIQuery'
import { throwAPIQueryError } from '../errors2'
import { renderQueryDefinition } from '../renderers/cssRenderers/queryRenderer'
import renderQuery from '../renderers/cssRenderers/styledComponentsRenderer'

const templateFunction = elements => (stringParts, ...interpolationValues) =>
  renderQuery(
    renderQueryDefinition(...elements),
    css(stringParts, ...interpolationValues)
  )

export default (...elements) =>
  compose(
    matchWithSuccessOrFailure(
      compose(templateFunction, prop(`elements`), prop(`value`)),
      compose(throwAPIQueryError, prop(`value`))
    ),
    validateAPIQuery
  )(
    toArgsObj({
      elements,
    })
  )
