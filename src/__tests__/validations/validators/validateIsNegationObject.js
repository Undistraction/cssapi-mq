import validateIsNegationObject from '../../../validations/validators/validateIsNegationObject'

describe(`validateIsNegationObject()`, () => {
  it(`returns a Validation.Success if the value is a negation object`, () => {
    const value = {
      not: `not screen and (display-mode: fullscreen) and (color-gamut: p3) and (orientation: landscape)`,
    }
    const result = validateIsNegationObject(value)
    expect(result).toEqualSuccessWithValue(value)
  })

  describe(`failures`, () => {
    it(`returns a Validation.Failure if the value not a negation object`, () => {
      const value = {}
      const result = validateIsNegationObject(value)
      expect(result).toEqualFailureWithValue({
        args: [[`not`], [`not`]],
        uid: `cssapi-mq.validateIsNegationObject`,
        value: {},
      })
    })

    it(`returns a Validation.Failure for 'null'`, () => {
      const value = null
      const result = validateIsNegationObject(value)
      expect(result).toEqualFailureWithValue({
        args: [],
        uid: `cssapi-mq.validateIsNegationObject`,
        value: null,
      })
    })

    it(`returns a Validation.Failure for 'undefined'`, () => {
      const value = undefined
      const result = validateIsNegationObject(value)
      expect(result).toEqualFailureWithValue({
        args: [],
        uid: `cssapi-mq.validateIsNegationObject`,
        value: undefined,
      })
    })
  })
})
