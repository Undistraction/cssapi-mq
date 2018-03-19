import {
  complement,
  compose,
  and,
  or,
  both,
  either,
  allPass,
  anyPass,
} from 'ramda'

export const nand = complement(and)
export const nor = complement(or)
export const notBoth = compose(complement, both)
export const neither = compose(complement, either)
export const notAllPass = compose(complement, allPass)
export const nonePass = compose(complement, anyPass)
