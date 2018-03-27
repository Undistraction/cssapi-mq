import { when, append, prop, objOf, compose } from 'ramda'
import { ensureArray, isEmptyArray } from 'ramda-adjunct'
import { matchWithSuccessOrFailure } from 'folktale-validations'
import { throwAPIMediaTypeError } from '../errors2'
import validateAPIMediaTypeArgs from '../validations/validators/args/validateAPIMediaTypeArgs'
import { toCommaSeparatedList } from '../utils/string'

export default defaultMediaType => (mediaTypes = [defaultMediaType]) =>
  compose(
    matchWithSuccessOrFailure(
      compose(toCommaSeparatedList, prop(`mediaTypes`), prop(`value`)),
      compose(throwAPIMediaTypeError, prop(`value`))
    ),
    validateAPIMediaTypeArgs,
    objOf(`mediaTypes`),
    when(isEmptyArray, append(defaultMediaType)),
    ensureArray
  )(mediaTypes)
