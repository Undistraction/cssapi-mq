import { reject, prepend, map } from 'ramda'
import cssSerialiser from '../testHelpers/cssSerialiser'
import {
  mqWithValidBreakpointsForRange,
  mqWithNoBreakpoints,
  invalidAspectRatioValues,
} from '../testHelpers/data'

expect.addSnapshotSerializer(cssSerialiser)

const removeNull = reject(v => v === null)

export const featureThrowsForInvalidBreakpoint = (
  name,
  camelisedName,
  method,
  { invalidNonExplicitValues, allowNoArgument = false } = {}
) => {
  if (allowNoArgument)
    invalidNonExplicitValues = removeNull(invalidAspectRatioValues)

  it(`throws if supplied breakpoint value is invalid`, () => {
    map(value => {
      expect(() => mqWithValidBreakpointsForRange(camelisedName)[method](value))
        .toThrowMultiline(`
          [cssapi-mq] ${method}() There is no '${name}' breakpoint defined called '${value}', only: 'small', 'medium', 'large', 'xLarge' are defined
      `)
    })(invalidNonExplicitValues)
  })
}

export const featureThrowsForMissingArgument = (
  name,
  camelizedName,
  method
) => {
  it(`throws if no argument is suppliedXßå`, () => {
    expect(() => mqWithValidBreakpointsForRange(camelizedName)[method]())
      .toThrowMultiline(`
      [cssapi-mq] ${method}() There is no '${name}' breakpoint defined called 'undefined', only: 'small', 'medium', 'large', 'xLarge' are defined`)
  })
}

export const featureThrowsForMissingBreakpointSet = (
  name,
  camelizedName,
  method
) => {
  it(`throws if '${name}' breakpoint map doesn't exist`, () => {
    expect(() => mqWithNoBreakpoints()[method](`xxxx`)).toThrowMultiline(`
      [cssapi-mq] ${method}() This mq object was not configured with a breakpoint set for '${name}'`)
  })
}

export const featureReturnsCorrectValueForBreakpoint = (
  name,
  camelizedName,
  method
) => {
  it(`returns the correct feature when called with existing breakpoint`, () => {
    expect(
      mqWithValidBreakpointsForRange(camelizedName)[method](`small`)
    ).toMatchSnapshot()
  })
}

export const featureThrowsForInvalidExplicitBreakpoint = (
  name,
  camelizedName,
  method,
  { invalidExplicitValues, allowNoArgument = false } = {}
) => {
  if (allowNoArgument)
    invalidExplicitValues = removeNull(invalidAspectRatioValues)

  it(`throws if supplied explicit breakpoint value is invalid`, () => {
    map(value => {
      expect(() => mqWithValidBreakpointsForRange(camelizedName)[method](value))
        .toThrowMultiline(`
          [cssapi-mq] ${method}() There is no '${name}' breakpoint defined called '${value}', only: 'small', 'medium', 'large', 'xLarge' are defined
      `)
    })(invalidExplicitValues)
  })
}

export const featureReturnsCorrectValueForValidExpicitValue = (
  name,
  camelizedName,
  method,
  { validExplicitValues, allowNoArgument = false } = {}
) => {
  if (allowNoArgument)
    validExplicitValues = prepend(undefined, validExplicitValues)
  map(value => {
    it(`returns the correct feature when called with a valid explicit value of '${value}'`, () => {
      expect(
        mqWithValidBreakpointsForRange(camelizedName, {
          useNamedBreakpoints: false,
        })[method](value)
      ).toMatchSnapshot()
    })
  })(validExplicitValues)
}

export const featureReturnsCorrectValueForValidExpicitValueIncludeNull = (
  name,
  camelizedName,
  method,
  { validExplicitValues } = {}
) => {
  featureReturnsCorrectValueForValidExpicitValue(
    name,
    method,
    prepend(null, validExplicitValues)
  )
}

export const featureReturnsCorrectValueNoArguments = (
  name,
  camelizedName,
  method
) => {
  it(`returns the correct feature when called with no arguments`, () => {
    expect(
      mqWithValidBreakpointsForRange(camelizedName)[method]()
    ).toMatchSnapshot()
  })
}
