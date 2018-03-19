import { when, append, prop, objOf, compose } from 'ramda'
import { ensureArray, isEmptyArray } from 'ramda-adjunct'
import { logToConsole } from 'ramda-log'
import { matchWithSuccessOrFailure } from 'folktale-validations'
import { propValue } from 'folktale-validations/lib/utils/validations'
import { throwAPIMediaTypeError } from '../errors2'
import validateAPIDefaultMediaTypeArgs from '../validations/validators/validateAPIDefaultMediaTypeArgs'
import { toCommaSeparatedList } from '../utils/string'

export default defaultMediaType => (mediaTypes = [defaultMediaType]) =>
  compose(
    matchWithSuccessOrFailure(
      compose(toCommaSeparatedList, prop(`mediaTypes`), propValue),
      compose(throwAPIMediaTypeError, propValue)
    ),
    logToConsole(`Failed`),
    validateAPIDefaultMediaTypeArgs,
    objOf(`mediaTypes`),
    when(isEmptyArray, append(defaultMediaType)),
    ensureArray
  )(mediaTypes)
