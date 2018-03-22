import { css } from 'styled-components'
import { isEmpty } from 'ramda'

import mediaType from './api/mediaType'
import buildLinearFeatures from './features/buildLinearFeatures'
import buildRangeFeatures from './features/buildRangedFeatures'
import renderQuery from './renderers/cssRenderers/styledComponentsRenderer'
import {
  renderQueryDefinition,
  renderNotQueryDefinition,
} from './renderers/cssRenderers/queryRenderer'
import { throwError, queryNoElementsErrorMessage } from './errors'
import tweak from './api/tweak'
import untweaked from './api/untweaked'

export default (breakpoints, config, originalMQ) => {
  // ---------------------------------------------------------------------------
  // API
  // ---------------------------------------------------------------------------

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

  // ---------------------------------------------------------------------------
  // Export
  // ---------------------------------------------------------------------------

  const mq = {
    mediaType: mediaType(config.defaultMediaType),
    ...buildLinearFeatures(),
    ...buildRangeFeatures(breakpoints, config),
    query,
    not,
    untweaked: untweaked(originalMQ),
  }
  mq.tweak = tweak(mq, breakpoints, config)
  return mq
}
