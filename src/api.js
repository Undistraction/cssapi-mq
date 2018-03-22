import { css } from 'styled-components'
import { partial, mergeDeepLeft, isEmpty, when } from 'ramda'
import { isUndefined } from 'ramda-adjunct'

import buildMediaType from './features/buildMediaType'
import buildLinearFeatures from './features/buildLinearFeatures'
import buildRangeFeatures from './features/buildRangedFeatures'
import { validateBreakpointSets, validateBreakpointMap } from './validations'
import renderQuery from './renderers/cssRenderers/styledComponentsRenderer'
import {
  renderQueryDefinition,
  renderNotQueryDefinition,
} from './renderers/cssRenderers/queryRenderer'
import {
  throwError,
  queryNoElementsErrorMessage,
  noUntweakedErrorMessage,
} from './errors'
import configure from './configure'

export default (breakpoints, config, originalMQ) => {
  // ---------------------------------------------------------------------------
  // API
  // ---------------------------------------------------------------------------

  const tweak = (mq, tweakpoints) => {
    if (breakpoints) validateBreakpointMap(tweakpoints)
    validateBreakpointSets(tweakpoints)
    const mergedBreakpoints = mergeDeepLeft(breakpoints, tweakpoints)
    return configure(mergedBreakpoints, config, mq)
  }

  const query = (...elements) => {
    if (isEmpty(elements)) throwError(queryNoElementsErrorMessage())
    return (stringParts, ...interpolationValues) =>
      renderQuery(
        renderQueryDefinition(...elements),
        css(stringParts, ...interpolationValues)
      )
  }

  const not = (...elements) => ({
    not: renderNotQueryDefinition(config.defaultMediaType, ...elements),
  })

  const untweaked = () =>
    when(isUndefined, () => throwError(noUntweakedErrorMessage()))(originalMQ)

  // ---------------------------------------------------------------------------
  // Export
  // ---------------------------------------------------------------------------

  const o = {
    mediaType: buildMediaType(config.defaultMediaType),
    ...buildLinearFeatures(),
    ...buildRangeFeatures(breakpoints, config),
    query,
    not,
    untweaked,
  }
  o.tweak = partial(tweak, [o])
  return o
}
