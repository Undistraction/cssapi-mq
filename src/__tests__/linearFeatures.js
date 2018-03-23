import { values, map } from 'ramda'
import camelcase from 'camelcase'
import { LINEAR_FEATURES } from '../features'
import featureValues from './testHelpers/featureValues'
import { mqWithValidBreakpointsForRange } from './testHelpers/data'
import cssSerialiser from './testHelpers/cssSerialiser'
import { toList } from '../utils/string'

expect.addSnapshotSerializer(cssSerialiser)

describe(`linear features`, () => {
  const testLinearFeature = (
    name,
    validValuesMap,
    invalidValues,
    { allowNoArgument = false } = {}
  ) => {
    const validValues = values(validValuesMap)
    const methodName = camelcase(name)
    describe(`${methodName}()`, () => {
      describe(`linear feature`, () => {
        if (allowNoArgument) {
          it(`doesn't throw if no argument is supplied`, () => {
            expect(() =>
              mqWithValidBreakpointsForRange(`width`)[methodName]()
            ).not.toThrow()
          })

          it(`returns a valueless ${name}`, () => {
            expect(
              mqWithValidBreakpointsForRange(`width`)[methodName]()
            ).toMatchSnapshot()
          })
        } else {
          it(`throws if no argument is supplied`, () => {
            expect(() => mqWithValidBreakpointsForRange(`width`)[methodName]())
              .toThrowMultiline(`
              [cssapi-mq] ${methodName}() Arguments missing required key(s): ['value']
            `)
          })

          it(`throws if 'undefined' is supplied`, () => {
            expect(() =>
              mqWithValidBreakpointsForRange(`width`)[methodName](undefined)
            ).toThrowMultiline(`
              [cssapi-mq] ${methodName}() Arguments missing required key(s): ['value']
            `)
          })
        }

        it(`throws if argument is invalid`, () => {
          map(value => {
            expect(() =>
              mqWithValidBreakpointsForRange(`width`)[methodName](value)
            ).toThrowMultiline(`
              [cssapi-mq] ${methodName}() Arguments included invalid value(s)
                – value: Value wasn't on the whitelist: ${toList(validValues)}`)
          })(invalidValues)
        })

        map(value => {
          it(`returns the supplied ${name} for '${value}'`, () => {
            expect(
              mqWithValidBreakpointsForRange(`width`)[methodName](value)
            ).toMatchSnapshot()
          })
        })(validValues)
      })
    })
  }

  map(feature => {
    const { name, validValues, allowNoArgument } = feature
    const { invalidValues } = featureValues(camelcase(name))
    testLinearFeature(name, validValues, invalidValues, { allowNoArgument })
  })(LINEAR_FEATURES)
})
