import {
  findIndex,
  both,
  always,
  flip,
  toUpper,
  assoc,
  when,
  unless,
  pipe,
} from 'ramda'
import { isUndefined } from 'ramda-adjunct'
import camelcase from 'camelcase'
import { reduceObjIndexed } from '../utils/object'

import {
  throwError,
  sameBreakpointsForBetweenErrorMessage,
  wrapWithErrorHandler,
} from '../errors'

import {
  getUpperLimit,
  propEqName,
  toBreakpointArray,
  getBreakpointNamed,
} from '../utils/breakpoints'

import { joinWithAnd } from '../utils/query'
import { buildFeatureItem, validateAndTransform } from '../utils/features'

export default (
  featureName,
  validator,
  transformer,
  breakpointSet = {},
  config
) => {
  const { defaultMediaType, useNamedBreakpoints, allowNoArgument } = config

  // ---------------------------------------------------------------------------
  // Renderer
  // ---------------------------------------------------------------------------

  const configuredValueRenderer = (
    methodName,
    value,
    { canSeparateQueries = false, noArgs = false } = {}
  ) =>
    unless(
      both(isUndefined, always(noArgs)),
      pipe(
        when(
          always(useNamedBreakpoints),
          getBreakpointNamed(featureName, methodName, breakpointSet)
        ),
        validateAndTransform(
          validator,
          transformer,
          assoc(`canSeparateQueries`, canSeparateQueries, config)
        )
      )
    )(value)

  const defaultAPIConfig = { mediaType: defaultMediaType }
  const orderedBreakpoints = toBreakpointArray(breakpointSet)
  const indexOfBreakpointNamed = flip(findIndex)(orderedBreakpoints)
  const nextBreakpointAboveNamed = getUpperLimit(orderedBreakpoints)

  // ---------------------------------------------------------------------------
  // Features
  // ---------------------------------------------------------------------------

  const feature = buildFeatureItem(featureName, configuredValueRenderer, {
    noArgs: allowNoArgument,
  })
  const aboveFeature = buildFeatureItem(
    `min-${featureName}`,
    configuredValueRenderer
  )
  const belowFeature = buildFeatureItem(
    `max-${featureName}`,
    configuredValueRenderer,
    {
      canSeparateQueries: true,
    }
  )

  // ---------------------------------------------------------------------------
  // Feature Helpers
  // ---------------------------------------------------------------------------

  const betweenFeatures = (from, to) => {
    if (from === to) throwError(sameBreakpointsForBetweenErrorMessage(from))
    const fromIndex = indexOfBreakpointNamed(propEqName(from))
    const toIndex = indexOfBreakpointNamed(propEqName(to))
    const [lower, higher] = fromIndex < toIndex ? [from, to] : [to, from]
    return joinWithAnd([aboveFeature(lower), belowFeature(higher)])
  }

  const atFeatureBreakpoint = (breakpoint, conf = defaultAPIConfig) => {
    const breakpointAbove = nextBreakpointAboveNamed(breakpoint)
    return breakpointAbove
      ? betweenFeatures(breakpoint, breakpointAbove, conf)
      : aboveFeature(breakpoint, conf)
  }

  const titleizedName =
    toUpper(featureName[0]) + camelcase(featureName.slice(1))

  // ---------------------------------------------------------------------------
  // Exports
  // ---------------------------------------------------------------------------

  const functionMap = {
    [camelcase(featureName)]: feature,
    [`min${titleizedName}`]: aboveFeature,
    [`max${titleizedName}`]: belowFeature,
    [`at${titleizedName}Breakpoint`]: atFeatureBreakpoint,
    [`between${titleizedName}s`]: betweenFeatures,
    [`at${titleizedName}`]: feature,
    [`above${titleizedName}`]: aboveFeature,
    [`below${titleizedName}`]: belowFeature,
  }

  return reduceObjIndexed(
    (acc, [functionName, f]) =>
      assoc(functionName, wrapWithErrorHandler(functionName, f), acc),
    {}
  )(functionMap)
}
