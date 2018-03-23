import { toThrowMultiline, toEqualMultiline } from 'jasmine-multiline-matchers'
import {
  toEqualSuccessWithValue,
  toEqualFailureWithValue,
} from 'jasmine-folktale'

expect.extend({
  toEqualMultiline,
  toThrowMultiline,
  toEqualSuccessWithValue,
  toEqualFailureWithValue,
})
