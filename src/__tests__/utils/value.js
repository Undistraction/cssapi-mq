import { map } from 'ramda'
import {
  isPositiveNumberWithDimensionsUnit,
  isPositiveIntegerOrZero,
} from '../../utils/predicates'

describe(`utils`, () => {
  describe(`isPositiveNumberWithDimensionsUnit`, () => {
    const validValues = [`14em`, `10px`, `16rem`]
    map(value => {
      it(`returns true for valid value '${value}'`, () => {
        expect(isPositiveNumberWithDimensionsUnit(value)).toBeTruthy()
      })
    })(validValues)
  })

  describe(`isPositiveIntegerOrZero`, () => {
    const validValues = [0, 44, 66, 77]
    map(value => {
      it(`returns true for valid value '${value}'`, () => {
        expect(isPositiveIntegerOrZero(value)).toBeTruthy()
      })
    })(validValues)
  })
})
