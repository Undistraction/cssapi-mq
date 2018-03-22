import { when, append, prop, objOf, compose } from 'ramda'
import { ensureArray, isEmptyArray } from 'ramda-adjunct'
import { matchWithSuccessOrFailure } from 'folktale-validations'
import { throwAPIMediaTypeError } from '../errors2'
import validateAPIDefaultMediaTypeArgs from '../validations/validators/validateAPIDefaultMediaTypeArgs'
import { toCommaSeparatedList } from '../utils/string'

export default defaultMediaType => (mediaTypes = [defaultMediaType]) =>
  compose(
    matchWithSuccessOrFailure(
      compose(toCommaSeparatedList, prop(`mediaTypes`), prop(`value`)),
      compose(throwAPIMediaTypeError, prop(`value`))
    ),
    validateAPIDefaultMediaTypeArgs,
    objOf(`mediaTypes`),
    when(isEmptyArray, append(defaultMediaType)),
    ensureArray
  )(mediaTypes)
