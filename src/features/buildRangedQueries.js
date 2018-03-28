import { assoc, compose } from 'ramda'

import query from '../api/query'

import { reduceObjIndexed } from '../utils/object'
import { titleize } from '../utils/string'
import { wrapWithErrorHandler } from '../errors'

const toQueryName = name => `query${titleize(name)}`

export default reduceObjIndexed((acc, [name, f]) => {
  const fName = toQueryName(name)
  return assoc(fName, wrapWithErrorHandler(fName, compose(query, f)), acc)
}, {})
