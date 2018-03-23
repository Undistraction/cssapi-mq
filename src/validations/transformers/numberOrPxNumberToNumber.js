import { numericPartOfUnitedNumber } from 'cssapi-units'
import { isNumber } from 'ramda-adjunct'
import { unless } from 'ramda'

export default unless(isNumber, numericPartOfUnitedNumber)
