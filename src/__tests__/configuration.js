import { reject, compose, toString, map, range, zipObj } from 'ramda'
import camelcase from 'camelcase'
import styledMQ from '../mq'
import cssSerialiser from './helpers/cssSerialiser'
import {
  mqWithValidBreakpointsForRange,
  validBreakpointsForRange,
  mqWithNoBreakpoints,
  invalidValues,
  genericStrings,
  genericValues,
  junkValues,
  genericNumbers,
  genericPositiveNumbers,
  positivePixelValues,
  booleanValues,
  negativePixelValues,
} from './testHelpers/data'
import featureValues from './testHelpers/featureValues'
import { rangedFeatureNames } from '../features'

expect.addSnapshotSerializer(cssSerialiser)

const breakpointNames = compose(map(toString), range(1))(50)

const validBreakpointValuesForFeature = name => ({
  [name]: zipObj(
    breakpointNames,
    featureValues(camelcase(name)).validExplicitValues
  ),
})

describe(`configure()`, () => {
  it(`doesn't throw with default configuration`, () => {
    expect(() => mqWithNoBreakpoints().not.toThrow())
  })

  describe(`breakpoints`, () => {
    it(`throws if invalid breakpoint set name is supplied`, () => {
      expect(() => styledMQ.configure({ xxxx: { small: 100 } }))
        .toThrowMultiline(`
            [cssapi-rhythm] configure() Arguments included invalid value(s)
              – breakpoints: Object included key(s) not on whitelist: ['width', 'height', 'resolution', 'aspectRatio', 'color', 'colorIndex', 'monochrome']`)
    })

    const invalidBreakpointValues = [
      ...genericStrings,
      ...booleanValues,
      ...genericNumbers,
      null,
      NaN,
      [],
    ]

    it(`throws if invalid value is supplied`, () => {
      map(value => {
        expect(() => styledMQ.configure(value)).toThrowMultiline(`
          [cssapi-rhythm] configure() Arguments included invalid value(s)
            – breakpoints: Wasn't Plain Object`)
      })(invalidBreakpointValues)
    })

    it(`doesn't throw if breakpoint set values are valid`, () => {
      map(rangedFeatureName => {
        const values = validBreakpointValuesForFeature(rangedFeatureName)
        expect(() => styledMQ.configure(values)).not.toThrow()
      })(rangedFeatureNames)
    })

    for (const featureName of rangedFeatureNames) {
      const invalidFeatureValues = featureValues(camelcase(featureName))
        .invalidExplicitValues

      for (const invalidValue of invalidFeatureValues) {
        it(`throws if invalid '${featureName}' breakpoint set value is supplied of '${invalidValue}'`, () => {
          expect(() =>
            styledMQ.configure({ [featureName]: { a: invalidValue } })
          ).toThrow(/^\[cssapi-rhythm\] configure\(\)/)
        })
      }
    }
  })

  describe(`config object`, () => {
    describe(`baseFontSize`, () => {
      it(`adjusts values based on 'basefontSize' for width`, () => {
        const result = mqWithValidBreakpointsForRange(`width`, {
          baseFontSize: 10,
        }).belowWidth(`small`)
        expect(result).toMatchSnapshot()
      })

      it(`adjusts values based on 'basefontSize' for height`, () => {
        const result = mqWithValidBreakpointsForRange(`height`, {
          baseFontSize: 10,
        }).belowHeight(`small`)
        expect(result).toMatchSnapshot()
      })

      const invalidBaseFontSizes = [...invalidValues, ...negativePixelValues]

      for (const value of invalidBaseFontSizes) {
        it(`throws if 'baseFontSize' is '${value}'`, () => {
          expect(() =>
            styledMQ.configure(validBreakpointsForRange(`width`), {
              baseFontSize: value,
            })
          ).toThrowMultiline(`
              [cssapi-rhythm] configure() Arguments included invalid value(s)
                – config: Object included invalid value(s)
                  – baseFontSize: (Wasn't Valid Number and Wasn't Non-Negative) or Wasn't valid non-negative number with unit: 'px'`)
        })
      }

      const validBaseFontSizes = [
        ...genericPositiveNumbers,
        ...positivePixelValues,
      ]

      for (const value of validBaseFontSizes) {
        it(`doesn't throw an error if 'baseFontSize' is '${value}'`, () => {
          expect(() =>
            styledMQ.configure(validBreakpointsForRange(`width`), {
              baseFontSize: value,
            })
          ).not.toThrow()
        })
      }
    })

    describe(`defaultMediaType`, () => {
      const invalidDefaultMediaTypes = reject(v => v === null, genericValues)
      for (const value of invalidDefaultMediaTypes) {
        it(`throws if 'defaultMediaType' is '${value}'`, () => {
          expect(() =>
            styledMQ.configure(validBreakpointsForRange(`width`), {
              defaultMediaType: value,
            })
          ).toThrowMultiline(`
          [cssapi-rhythm] configure() Arguments included invalid value(s)
            – config: Object included invalid value(s)
              – defaultMediaType: Value wasn't on the whitelist: ['all', 'print', 'screen', 'speech'] or Wasn't null`)
        })
      }

      const validDefaultMediaTypes = [`screen`, `print`, `all`, `speech`, null]
      for (const value of validDefaultMediaTypes) {
        it(`doesn't throw an error if 'defaultMediaType' is '${value}'`, () => {
          expect(() =>
            styledMQ.configure(validBreakpointsForRange(`width`), {
              defaultMediaType: value,
            })
          ).not.toThrow()
        })
      }
    })

    describe(`dimensionsUnit`, () => {
      const invalidDimensionsUnits = [...invalidValues, ...genericStrings]
      for (const value of invalidDimensionsUnits) {
        it(`throws if 'dimensionsUnit' is '${value}'`, () => {
          const config = { dimensionsUnit: value }
          expect(() =>
            styledMQ.configure(validBreakpointsForRange(`width`), config)
          ).toThrowMultiline(`
          [cssapi-rhythm] configure() Arguments included invalid value(s)
            – config: Object included invalid value(s)
              – dimensionsUnit: Value wasn't on the whitelist: ['em', 'rem', 'px']
          `)
        })
      }

      const validDimensionsUnits = [`em`, `rem`, `px`]
      for (const value of validDimensionsUnits) {
        it(`doesn't throw an error if 'dimensionsUnit' is '${value}'`, () => {
          const config = { dimensionsUnit: value }
          expect(() =>
            styledMQ.configure(validBreakpointsForRange(`width`), config)
          ).not.toThrow()
        })
      }
    })

    describe(`shouldSeparateQueries`, () => {
      const invalidShouldSeparateQueriesValues = [
        ...junkValues,
        ...genericNumbers,
        genericStrings,
      ]

      for (const value of invalidShouldSeparateQueriesValues) {
        it(`throws if 'shouldSeparateQueries' is '${value}'`, () => {
          const config = { shouldSeparateQueries: value }
          expect(() =>
            styledMQ.configure(validBreakpointsForRange(`width`), config)
          ).toThrowMultiline(`
            [cssapi-rhythm] configure() Arguments included invalid value(s)
              – config: Object included invalid value(s)
                – shouldSeparateQueries: Wasn't Boolean`)
        })
      }

      const validShouldSeparateQueriesValues = [true, false]
      for (const value of validShouldSeparateQueriesValues) {
        it(`doesn't throw an error if 'shouldSeparateQueries' isn't  a '${value}'`, () => {
          const config = { shouldSeparateQueries: value }
          expect(() =>
            styledMQ.configure(validBreakpointsForRange(`width`), config)
          ).not.toThrow()
        })
      }
    })
  })
})
