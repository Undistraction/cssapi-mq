import { when } from 'ramda'
import { isUndefined } from 'ramda-adjunct'
import { throwAPIUntweakedError } from '../errors2'

export default originalMQ => () =>
  when(isUndefined, () => throwAPIUntweakedError())(originalMQ)
