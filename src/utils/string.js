import { map, append, prepend, compose, join, of, concat } from 'ramda'

export const joinWithNoSpace = join(``)
export const joinWithCommaSpace = join(`, `)
export const joinWithComma = join(`,`)
export const joinWithSpace = join(` `)
export const joinWithColon = join(`: `)

export const wrapWith = (a, b = a) =>
  compose(joinWithNoSpace, prepend(a), append(b), of)

export const wrapWithSquareBrackets = wrapWith(`[`, `]`)
export const wrapWithSoftBrackets = wrapWith(`(`, `)`)
export const wrapWithSingleQuotes = wrapWith(`'`)

export const toCommaSeparatedList = values => values.join(`, `)

export const quoteAndJoinWithComma = compose(
  joinWithCommaSpace,
  map(wrapWithSingleQuotes)
)

export const toList = compose(wrapWithSquareBrackets, quoteAndJoinWithComma)

export const prefixWithNot = concat(`not `)
