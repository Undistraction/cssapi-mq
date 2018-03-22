import validateIsNegationObject from '../../../validations/validators/validateIsNegationObject'

describe(`validateIsNegationObject()`, () => {
  it(`returns a Validation.Success if the value is a negation object`, () => {
    const value = {
      not: `not screen and (display-mode: fullscreen) and (color-gamut: p3) and (orientation: landscape)`,
    }

    const result = validateIsNegationObject(value)
    expect(result).toEqualSuccessWithValue(value)
  })

  it(`returns a Validation.Failure if the value not a negation object`, () => {
    const value = {}
    const result = validateIsNegationObject(value)
    expect(result).toEqualFailureWithValue({
      args: [[`not`], [`not`]],
      uid: `folktale-validations.validateRequiredKeys`,
      value: {},
    })
  })
})
