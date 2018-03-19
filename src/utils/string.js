import { join } from 'ramda'

// eslint-disable-next-line import/prefer-default-export
export const toCommaSeparatedList = values => values.join(', ')
export const joinWithSpace = join(' ')
