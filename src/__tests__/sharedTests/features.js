import { reject, prepend } from 'ramda'
import cssSerialiser from '../helpers/cssSerialiser'
import {
  mqWithValidBreakpointsForRange,
  mqWithNoBreakpoints,
  invalidAspectRatioValues,
} from '../testHelpers/data'

expect.addSnapshotSerializer(cssSerialiser)

const removeNull = reject(v => v === null)

export const featureThrowsForInvalidBreakpoint = (
  name,
  method,
  { invalidNonExplicitValues, allowNoArgument = false } = {}
) => {
  if (allowNoArgument)
    invalidNonExplicitValues = removeNull(invalidAspectRatioValues)

  for (const value of invalidNonExplicitValues) {
    it(`throws if supplied breakpoint value is invalid '${value}'`, () => {
      expect(() =>
        mqWithValidBreakpointsForRange(name)[method](value)
      ).toThrowErrorMatchingSnapshot()
    })
  }
}

export const featureThrowsForMissingArgument = (name, method) => {
  it(`throws if no argument is suppliedXßå`, () => {
    expect(() =>
      mqWithValidBreakpointsForRange(name)[method]()
    ).toThrowErrorMatchingSnapshot()
  })
}

export const featureThrowsForMissingBreakpointSet = (name, method) => {
  it(`throws if '${name}' breakpoint map doesn't exist`, () => {
    expect(() =>
      mqWithNoBreakpoints()[method](`xxxx`)
    ).toThrowErrorMatchingSnapshot()
  })
}

export const featureReturnsCorrectValueForBreakpoint = (name, method) => {
  it(`returns the correct feature when called with existing breakpoint`, () => {
    expect(
      mqWithValidBreakpointsForRange(name)[method](`small`)
    ).toMatchSnapshot()
  })
}

export const featureThrowsForInvalidExplicitBreakpoint = (
  name,
  method,
  { invalidExplicitValues, allowNoArgument = false } = {}
) => {
  if (allowNoArgument)
    invalidExplicitValues = removeNull(invalidAspectRatioValues)

  for (const value of invalidExplicitValues) {
    it(`throws if supplied explicit breakpoint value is invalid '${value}'`, () => {
      expect(() =>
        mqWithValidBreakpointsForRange(name)[method](value)
      ).toThrowErrorMatchingSnapshot()
    })
  }
}

export const featureReturnsCorrectValueForValidExpicitValue = (
  name,
  method,
  { validExplicitValues, allowNoArgument = false } = {}
) => {
  if (allowNoArgument) validExplicitValues = prepend(null, validExplicitValues)
  for (const value of validExplicitValues) {
    it(`returns the correct feature when called with a valid explicit value of '${value}'`, () => {
      expect(
        mqWithValidBreakpointsForRange(name, { onlyNamedBreakpoints: false })[
          method
        ](value)
      ).toMatchSnapshot()
    })
  }
}

export const featureReturnsCorrectValueForValidExpicitValueIncludeNull = (
  name,
  method,
  { validExplicitValues } = {}
) => {
  featureReturnsCorrectValueForValidExpicitValue(
    name,
    method,
    prepend(null, validExplicitValues)
  )
}

export const featureReturnsCorrectValueNoArguments = (name, method) => {
  it(`returns the correct feature when called with no arguments`, () => {
    expect(mqWithValidBreakpointsForRange(name)[method]()).toMatchSnapshot()
  })
}
