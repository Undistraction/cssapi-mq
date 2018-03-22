import { map, append, prepend, compose, join, of } from 'ramda'

export const joinWithNoSpace = join(``)
export const joinWithComma = join(`, `)

export const wrapWith = (a, b = a) =>
  compose(joinWithNoSpace, prepend(a), append(b), of)

export const wrapWithSquareBrackets = wrapWith(`[`, `]`)
export const wrapWithSingleQuotes = wrapWith(`'`)

// eslint-disable-next-line import/prefer-default-export
export const toCommaSeparatedList = values => values.join(`, `)
export const joinWithSpace = join(` `)

export const quoteAndJoinWithComma = compose(
  joinWithComma,
  map(wrapWithSingleQuotes)
)

export const toList = compose(wrapWithSquareBrackets, quoteAndJoinWithComma)
