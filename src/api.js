/* eslint-disable ramda/no-redundant-not */

import { assoc } from 'ramda'

import mediaType from './api/mediaType'
import buildLinearFeatures from './features/buildLinearFeatures'
import buildRangeFeatures from './features/buildRangedFeatures'

import tweak from './api/tweak'
import query from './api/query'
import not from './api/not'
import untweaked from './api/untweaked'
import { reduceObjIndexed } from './utils/object'
import { titleize } from './utils/string'
import { wrapWithErrorHandler } from './errors'

const buildRangedQueries = reduceObjIndexed((acc, [name, f]) => {
  const fName = `query${titleize(name)}`
  return assoc(
    fName,
    bpName => {
      const f2 = n => query(f(n))
      return wrapWithErrorHandler(fName, f2)(bpName)
    },
    acc
  )
}, {})

export default (breakpoints, config, originalMQ) => {
  const { defaultMediaType } = config
  const rangedFeatures = buildRangeFeatures(breakpoints, config)
  const rangedQueries = buildRangedQueries(rangedFeatures)

  const mq = {
    mediaType: mediaType(defaultMediaType),
    ...buildLinearFeatures(),
    ...rangedFeatures,
    ...rangedQueries,
    query,
    not: not(defaultMediaType),
    untweaked: untweaked(originalMQ),
  }
  mq.tweak = tweak(mq, breakpoints, config)
  return mq
}
