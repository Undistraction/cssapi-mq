import { compose, construct, always } from 'ramda'
import { configureRenderers } from 'folktale-validations'
import { appendFlipped } from 'ramda-adjunct'
import validatorMessages from './validations/validatorMessages'
import {
  ERROR_PREFIX,
  CONFIGURE_PREFIX,
  API_MEDIA_TYPE_PREFIX,
  UNTWEAKED_PREFIX,
  linearFeaturePrefix,
  TWEAK_PREFIX,
  NOT_PREFIX,
  QUERY_PREFIX,
} from './const'
import { joinWithSpace } from './utils/string'

const { argumentsFailureRenderer } = configureRenderers({
  validatorMessages,
})

// -----------------------------------------------------------------------------
// Utils
// -----------------------------------------------------------------------------

const constructError = construct(Error)

const throwError = error => {
  throw error
}

const throwNewError = compose(throwError, constructError)

const throwErrorWithMessage = compose(
  throwNewError,
  joinWithSpace,
  appendFlipped([ERROR_PREFIX])
)

const throwErrorWithPrefixedMessage = prefix =>
  compose(throwErrorWithMessage, joinWithSpace, appendFlipped([prefix]))

// -----------------------------------------------------------------------------
// Prefixed Errors
// -----------------------------------------------------------------------------

export const throwConfigureError = compose(
  throwErrorWithPrefixedMessage(CONFIGURE_PREFIX),
  argumentsFailureRenderer
)
export const throwAPIMediaTypeError = compose(
  throwErrorWithPrefixedMessage(API_MEDIA_TYPE_PREFIX),
  argumentsFailureRenderer
)
export const throwAPILinearFeatureError = name => value =>
  compose(
    throwErrorWithPrefixedMessage(linearFeaturePrefix(name)),
    argumentsFailureRenderer
  )(value)

export const throwAPITweakError = compose(
  throwErrorWithPrefixedMessage(TWEAK_PREFIX),
  argumentsFailureRenderer
)

export const throwAPIUntweakedError = () =>
  throwErrorWithPrefixedMessage(UNTWEAKED_PREFIX)(
    `There is no untweaked mq object available to untweak`
  )

export const throwAPINotError = () =>
  compose(throwErrorWithPrefixedMessage(NOT_PREFIX), argumentsFailureRenderer)

export const throwQueryError = () =>
  compose(throwErrorWithPrefixedMessage(QUERY_PREFIX), argumentsFailureRenderer)
