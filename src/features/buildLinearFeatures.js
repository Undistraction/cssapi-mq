import { reduce, assoc } from 'ramda'
import camelcase from 'camelcase'
import { LINEAR_FEATURES } from '../features'

import buildLinearFeature from '../features/buildLinearFeature'

const reducer = (acc, { name, validValues, allowNoArgument }) =>
  assoc(
    camelcase(name),
    buildLinearFeature(name, validValues, allowNoArgument),
    acc
  )

export default () => reduce(reducer, {}, LINEAR_FEATURES)
