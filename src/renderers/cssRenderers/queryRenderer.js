import {
  reject,
  compose,
  isNil,
  when,
  map,
  any,
  contains,
  values,
  curry,
  prop,
  flip,
  prepend,
  cond,
  T,
  unless,
  of,
  identity,
} from 'ramda'

import { isArray } from 'ramda-adjunct'

import { MEDIA_PREFIX, MEDIA_TYPES } from '../../const'
import { joinWithAnd } from '../../utils/query'
import {
  joinWithColon,
  joinWithCommaSpace,
  prefixWithNot,
  joinWithSpace,
  wrapWithSoftBrackets,
  joinWithComma,
} from '../../utils/string'
import { isNegationObject } from '../../utils/predicates'

const nameValue = compose(joinWithColon, reject(isNil))
const expandNegationObject = prop(`not`)
const containsMediaType = flip(contains)(values(MEDIA_TYPES))
const arrayContainsMediaType = any(containsMediaType)

const renderElements = map(compose(prefixWithNot, when(isArray, joinWithAnd)))

const ensureMediaType = (defaultMediaType, ...elements) =>
  map(
    cond([
      [isArray, unless(arrayContainsMediaType, prepend(defaultMediaType))],
      [containsMediaType, identity],
      [T, compose(joinWithAnd, prepend(defaultMediaType))],
    ])
  )(elements)

export const renderFeature = curry((name, value) =>
  compose(wrapWithSoftBrackets, nameValue)([name, value])
)

export const renderQueryDefinition = (...elements) =>
  compose(
    joinWithSpace,
    prepend(MEDIA_PREFIX),
    of,
    joinWithComma,
    map(when(isArray, joinWithAnd)),
    map(when(isNegationObject, expandNegationObject))
  )(elements)

export const renderNotQueryDefinition = defaultMediaType => (...elements) =>
  compose(joinWithCommaSpace, renderElements, ensureMediaType)(
    defaultMediaType,
    ...elements
  )
