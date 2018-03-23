import dimensionTransformer from '../../../validations/transformers/dimensionTransformer'

describe(`dimensionTransformer()`, () => {
  describe(`with default config`, () => {
    describe(`with unitless value`, () => {
      it(`returns the correct value`, () => {
        const value = 10
        const result = dimensionTransformer()(value)
        expect(result).toEqual(`0.625em`)
      })
    })

    describe(`with united em value`, () => {
      it(`returns the correct value`, () => {
        const value = `0.625em`
        const result = dimensionTransformer()(value)
        expect(result).toEqual(`0.625em`)
      })
    })

    describe(`with canSeparateQueries set to true`, () => {
      it(`returns the correct value`, () => {
        const value = `0.625em`
        const result = dimensionTransformer({
          shouldSeparateQueries: true,
          canSeparateQueries: true,
        })(value)
        expect(result).toEqual(`0.624375em`)
      })
    })
  })
})
