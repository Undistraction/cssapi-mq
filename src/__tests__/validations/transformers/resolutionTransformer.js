import resolutionTransformer from '../../../validations/transformers/resolutionTransformer'

describe(`resolutionTransformer()`, () => {
  describe(`with default config`, () => {
    describe(`with unitless value`, () => {
      it(`returns the correct value`, () => {
        const value = 10
        const result = resolutionTransformer()(value)
        expect(result).toEqual(`10dpi`)
      })
    })

    describe(`with united em value`, () => {
      it(`returns the correct value`, () => {
        const value = `10dpi`
        const result = resolutionTransformer()(value)
        expect(result).toEqual(`10dpi`)
      })
    })

    describe(`with canSeparateQueries set to true`, () => {
      it(`returns the correct value`, () => {
        const value = `10dpi`
        const result = resolutionTransformer({
          shouldSeparateQueries: true,
          canSeparateQueries: true,
        })(value)
        expect(result).toEqual(`9dpi`)
      })
    })
  })
})
