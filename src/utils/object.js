import { pickBy } from 'ramda'
import { isNotUndefined } from 'ramda-adjunct'

// eslint-disable-next-line import/prefer-default-export
export const pickIsNotUndefined = pickBy(isNotUndefined)
