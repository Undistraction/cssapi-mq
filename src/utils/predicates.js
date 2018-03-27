import {
  __,
  compose,
  both,
  complement,
  isEmpty,
  values,
  contains,
  flip,
  all,
  has,
} from 'ramda'
import {
  isValidPositiveNumber,
  isNumberWithUnit,
  isNumberWithDpi,
  numericPartOfUnitedNumber,
} from 'cssjs-units'

import { isPlainObj, isNonNegative, isInteger, isPositive } from 'ramda-adjunct'

import { DIMENSIONS_UNITS, MEDIA_TYPES } from '../const'

export const isNonEmptyObject = both(complement(isEmpty), isPlainObj)
export const isPositiveInteger = both(isPositive, isInteger)
export const isPositiveIntegerOrZero = both(isNonNegative, isInteger)

export const isNumericPartOfUnitValuePositive = compose(
  isValidPositiveNumber,
  numericPartOfUnitedNumber
)

export const isPositiveNumberWithPixelUnit = both(
  isNumberWithUnit([DIMENSIONS_UNITS.PX]),
  isNumericPartOfUnitValuePositive
)

export const isNumberWithDimensionsUnit = isNumberWithUnit(
  values(DIMENSIONS_UNITS)
)

export const isPositiveNumberWithResolutionUnit = both(
  isNumberWithDpi,
  isNumericPartOfUnitValuePositive
)

export const isPositiveNumberWithDimensionsUnit = both(
  isNumberWithDimensionsUnit,
  isNumericPartOfUnitValuePositive
)

export const doesListIncludeValue = list => contains(__, values(list))
export const isDimensionsUnitValid = contains(__, values(DIMENSIONS_UNITS))
export const isMediaTypeValid = flip(contains)(values(MEDIA_TYPES))
export const areMediaTypesValid = both(
  all(isMediaTypeValid),
  complement(isEmpty)
)

export const isNegationObject = both(isPlainObj, has(`not`))
