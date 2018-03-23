import { map, compose } from 'ramda'
import camelcase from 'camelcase'
import { matchWithSuccessOrFailure } from 'folktale-validations'
import { renderFeature } from '../renderers/cssRenderers/queryRenderer'
import { propValue } from './validations'
import { throwAPILinearFeatureInvalidValueError } from '../errors2'
import { RANGED_FEATURES } from '../features'
import { propName } from './breakpoints'

export const buildFeatureItem = (featureName, valueRenderer, config) => value =>
  renderFeature(featureName, valueRenderer(featureName, value, config))

export const validateAndTransform = (validator, transformer, config) => value =>
  compose(
    transformer(config),
    matchWithSuccessOrFailure(
      propValue,
      compose(throwAPILinearFeatureInvalidValueError, propValue)
    ),
    validator
  )(value)

export const rangedFeatureNames = map(compose(camelcase, propName))(
  RANGED_FEATURES
)
