import { compose, construct } from 'ramda'
import { configureRenderers } from 'folktale-validations'
import { appendFlipped } from 'ramda-adjunct'
import validatorMessages from './validations/validatorMessages'
import { ERROR_PREFIX, CONFIGURE_PREFIX } from './const'
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

// eslint-disable-next-line import/prefer-default-export
export const throwConfigureError = compose(
  throwErrorWithPrefixedMessage(CONFIGURE_PREFIX),
  argumentsFailureRenderer
)
// export const throwAPIVerticalRhythmError = compose(
//   throwErrorWithPrefixedMessage(API_VERTICAL_RHYTHM_PREFIX),
//   argumentsFailureRenderer
// )
// export const throwAPIHorizontalRhythmError = compose(
//   throwErrorWithPrefixedMessage(API_HORIZONTAL_RHYTHM_PREFIX),
//   argumentsFailureRenderer
// )
// export const throwAPIRhythmError = compose(
//   throwErrorWithPrefixedMessage(API_RHYTHM_PREFIX),
//   argumentsFailureRenderer
// )
