import { toThrowMultiline } from 'jasmine-multiline-matchers'
import {
  toEqualSuccessWithValue,
  toEqualFailureWithValue,
} from 'jasmine-folktale'

expect.extend({
  toThrowMultiline,
  toEqualSuccessWithValue,
  toEqualFailureWithValue,
})
