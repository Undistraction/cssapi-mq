import { map, merge, mergeAll, curry, defaultTo } from 'ramda'
import camelcase from 'camelcase'
import { RANGED_FEATURES } from '../features'
import buildRangedFeature from './buildRangedFeature'

const build = (globalConfig, breakpoints, item) => {
  breakpoints = defaultTo({}, breakpoints)
  const x = buildRangedFeature(
    item.name,
    item.valueRenderer(globalConfig),
    breakpoints[camelcase(item.name)],
    merge(globalConfig, item.config)
  )
  return x
}

export default (breakpoints, globalConfig) =>
  mergeAll(map(curry(build)(globalConfig, breakpoints))(RANGED_FEATURES))
