import { values, drop, map } from 'ramda'
import { MEDIA_TYPES } from '../../const'
import { mqWithValidBreakpointsForRange } from '../testHelpers/data'
import cssSerialiser from '../testHelpers/cssSerialiser'

expect.addSnapshotSerializer(cssSerialiser)
const validValues = values(MEDIA_TYPES)

describe(`mediaTypes`, () => {
  it(`returns default media type if called with no arguments`, () => {
    expect(
      mqWithValidBreakpointsForRange(`width`).mediaType()
    ).toMatchSnapshot()
  })

  it(`returns default media type if called with an empty array`, () => {
    expect(
      mqWithValidBreakpointsForRange(`width`).mediaType([])
    ).toMatchSnapshot()
  })

  map(value => {
    it(`returns the supplied mediaTypes for '${value}'`, () => {
      expect(
        mqWithValidBreakpointsForRange(`width`).mediaType(value)
      ).toMatchSnapshot()
    })
  })(validValues)

  it(`supports multiple values`, () => {
    expect(
      mqWithValidBreakpointsForRange(`width`).mediaType(drop(2, validValues))
    ).toMatchSnapshot()
  })
  const invalidMediaTypes = [``, true, false, `xxxx`, 444, {}]

  it(`throws if argument is invalid`, () => {
    map(value => {
      expect(() => mqWithValidBreakpointsForRange(`width`).mediaType(value))
        .toThrowMultiline(`
            [cssapi-mq] mediaType() Arguments included invalid value(s)
              – mediaTypes: Array included invalid value(s)
                – [0] Value wasn't on the whitelist: ['all', 'print', 'screen', 'speech'] or Wasn't null`)
    })(invalidMediaTypes)
  })
})
