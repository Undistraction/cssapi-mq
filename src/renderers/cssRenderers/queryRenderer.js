import {
  __,
  reject,
  concat,
  compose,
  isNil,
  join,
  when,
  map,
  any,
  both,
  has,
  contains,
  values,
  curry,
} from 'ramda'
import { isArray, isObj } from 'ramda-adjunct'

import { MEDIA_PREFIX, MEDIA_TYPES } from '../../const'

const nameValue = compose(join(`: `), reject(isNil))
const isNegationObject = both(isObj, has(`not`))

export const joinAnd = join(` and `)
const joinComma = join(`, `)
const prefixWithNot = concat(`not `)
const expandNegationObject = negationObject => negationObject.not
const containsMediaType = contains(__, values(MEDIA_TYPES))
const arrayContainsMediaType = any(containsMediaType)

export const ensureMediaType = (defaultMediaType, ...elements) =>
  map(element => {
    if (isArray(element)) {
      // Only add prefix if no media type is declared
      if (arrayContainsMediaType(element)) {
        return element
      }
      return [defaultMediaType, ...element]
    }
    if (containsMediaType(element)) {
      return element
    }
    return joinAnd([defaultMediaType, element])
  })(elements)

export const renderFeature = curry((name, value) =>
  join(``, [`(`, nameValue([name, value]), `)`])
)

export const renderQueryDefinition = (...elements) => {
  elements = map(when(isNegationObject, expandNegationObject))(elements)
  elements = map(when(isArray, joinAnd))(elements)
  return join(` `, [MEDIA_PREFIX, elements])
}

export const renderNotQueryDefinition = defaultMediaType => (...elements) => {
  elements = ensureMediaType(defaultMediaType, ...elements)
  return compose(
    joinComma,
    map(compose(prefixWithNot, when(isArray, joinAnd)))
  )(elements)
}
