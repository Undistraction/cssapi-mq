import { reduce, merge } from 'ramda'
import camelcase from 'camelcase'
import { RANGED_FEATURES } from '../features'
import buildRangedFeature from './buildRangedFeature'

const reducer = (globalConfig, breakpoints = {}) => (
  acc,
  { valueRenderer, name, config }
) => {
  const feat = buildRangedFeature(
    name,
    valueRenderer(globalConfig),
    breakpoints[camelcase(name)],
    merge(globalConfig, config)
  )
  return merge(acc, feat)
}

export default (breakpoints, globalConfig) =>
  reduce(reducer(globalConfig, breakpoints), {}, RANGED_FEATURES)
