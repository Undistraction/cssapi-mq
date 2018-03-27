import { reduce, merge, prop } from 'ramda'
import camelcase from 'camelcase'
import { RANGED_FEATURES } from '../features'
import buildRangedFeature from './buildRangedFeature'

const breakpointMapNamed = (name, breakpoints) =>
  prop(camelcase(name), breakpoints)

const reducer = (globalConfig, breakpoints = {}) => (
  acc,
  { name, featureConfig, validator, transformer }
) => {
  const feat = buildRangedFeature(
    name,
    validator,
    transformer,
    breakpointMapNamed(name, breakpoints),
    merge(globalConfig, featureConfig)
  )
  return merge(acc, feat)
}

export default (breakpoints, globalConfig) =>
  reduce(reducer(globalConfig, breakpoints), {}, RANGED_FEATURES)
