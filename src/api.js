/* eslint-disable ramda/no-redundant-not */

import mediaType from './api/mediaType'
import buildLinearFeatures from './features/buildLinearFeatures'
import buildRangeFeatures from './features/buildRangedFeatures'

import tweak from './api/tweak'
import query from './api/query'
import not from './api/not'
import untweaked from './api/untweaked'
import buildRangedQueries from './features/buildRangedQueries'

export default (breakpoints, config, originalMQ) => {
  const { defaultMediaType } = config
  const linearFeatures = buildLinearFeatures()
  const rangedFeatures = buildRangeFeatures(breakpoints, config)
  const rangedQueries = buildRangedQueries(rangedFeatures)

  const mq = {
    mediaType: mediaType(defaultMediaType),
    ...linearFeatures,
    ...rangedFeatures,
    ...rangedQueries,
    query,
    not: not(defaultMediaType),
    untweaked: untweaked(originalMQ),
  }
  mq.tweak = tweak(mq, breakpoints, config)
  return mq
}
