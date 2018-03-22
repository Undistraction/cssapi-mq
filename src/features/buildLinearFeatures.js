import { mergeAll, map } from 'ramda'
import camelcase from 'camelcase'
import { LINEAR_FEATURES } from '../features'

import buildLinearFeature from '../features/buildLinearFeature'

const toLinearFeatures = map(({ name, validValues, allowNoArgument }) => ({
  [camelcase(name)]: buildLinearFeature(name, validValues, allowNoArgument),
}))

export default () => mergeAll(toLinearFeatures(LINEAR_FEATURES))
