/* eslint-disable ramda/no-redundant-not */

import mediaType from './api/mediaType'
import buildLinearFeatures from './features/buildLinearFeatures'
import buildRangeFeatures from './features/buildRangedFeatures'

import tweak from './api/tweak'
import query from './api/query'
import not from './api/not'
import untweaked from './api/untweaked'

export default (breakpoints, config, originalMQ) => {
  const { defaultMediaType } = config

  const mq = {
    mediaType: mediaType(defaultMediaType),
    ...buildLinearFeatures(),
    ...buildRangeFeatures(breakpoints, config),
    query,
    not: not(defaultMediaType),
    untweaked: untweaked(originalMQ),
  }
  mq.tweak = tweak(mq, breakpoints, config)
  return mq
}
