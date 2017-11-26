import { findIndex, isNil } from 'ramda';
import camelcase from 'camelcase';
import { getValidatorForFeature } from '../validations';

import { MEDIA_TYPES } from '../const';
import {
  throwError,
  sameBreakpointsForBetweenErrorMessage,
  missingBreakpointErrorMessage,
  mssingBreakpointMapErrorMessage,
} from '../errors';
import buildMediaType from './buildMediaType';

import { getUpperLimit, propEqName, toBreakpointArray } from '../utils';

import {
  joinAnd,
  renderFeature,
} from '../renderers/cssRenderers/queryRenderer';

const buildFeatureItem = (name, parser, config) => breakpoint =>
  renderFeature(name, parser(breakpoint, config));

const nilValueAndAllowedToPass = (value, noArgs) => isNil(value) && noArgs;

export default (
  name,
  valueRenderer,
  breakpoints = {},
  {
    defaultMediaType = MEDIA_TYPES.SCREEN,
    onlyNamedBreakpoints = true,
    allowNoArgument = false,
  } = {}
) => {
  const camelisedName = camelcase(name);

  const validator = getValidatorForFeature(camelisedName);

  // ---------------------------------------------------------------------------
  // UTILS
  // ---------------------------------------------------------------------------

  const getBreakpointNamed = breakpoint => {
    if (!breakpoints)
      throwError(mssingBreakpointMapErrorMessage(camelisedName));
    const value = breakpoints[breakpoint];
    if (isNil(value))
      throwError(missingBreakpointErrorMessage(breakpoint, name, breakpoints));
    return value;
  };

  const configuredValueRenderer = (
    value,
    { shouldSeparate = false, noArgs = false } = {}
  ) => {
    // TODO clean this up, but order here is vital - we need to return in this
    // order.
    if (nilValueAndAllowedToPass(value, noArgs)) {
      return valueRenderer(value, shouldSeparate);
    }

    if (onlyNamedBreakpoints) {
      value = getBreakpointNamed(value);
      return valueRenderer(value, shouldSeparate);
    }

    if (validator.validate(value)) {
      return valueRenderer(value, shouldSeparate);
    }

    throw new Error(`Supplied value was invalid: '${value}'`);
  };

  const defaultAPIConfig = { mediaType: defaultMediaType };
  const mediaType = buildMediaType(defaultMediaType);

  const orderedBreakpoints = toBreakpointArray(breakpoints);
  const indexOfBreakpointNamed = value => findIndex(value, orderedBreakpoints);

  const nextBreakpointAboveNamed = value =>
    getUpperLimit(orderedBreakpoints, value);

  // ---------------------------------------------------------------------------
  // Features
  // ---------------------------------------------------------------------------

  const feature = buildFeatureItem(name, configuredValueRenderer, {
    noArgs: allowNoArgument,
  });
  const minFeature = buildFeatureItem(`min-${name}`, configuredValueRenderer);
  const maxFeature = buildFeatureItem(`max-${name}`, configuredValueRenderer, {
    shouldSeparate: true,
  });

  // ---------------------------------------------------------------------------
  // Feature Helpers
  // ---------------------------------------------------------------------------

  const aboveFeature = from => minFeature(from);

  const belowFeature = to => maxFeature(to);

  const betweenFeatures = (from, to) => {
    if (from === to) throwError(sameBreakpointsForBetweenErrorMessage(from));
    const fromIndex = indexOfBreakpointNamed(propEqName(from));
    const toIndex = indexOfBreakpointNamed(propEqName(to));
    const [lower, higher] = fromIndex < toIndex ? [from, to] : [to, from];
    return joinAnd([minFeature(lower), maxFeature(higher)]);
  };

  const atFeatureBreakpoint = (breakpoint, config = defaultAPIConfig) => {
    const breakpointAbove = nextBreakpointAboveNamed(breakpoint);
    if (breakpointAbove) {
      return betweenFeatures(breakpoint, breakpointAbove, config);
    }
    return aboveFeature(breakpoint, config);
  };

  const atFeature = breakpoint => feature(breakpoint);

  const titleizedName = name[0].toUpperCase() + camelcase(name.slice(1));

  exports = {
    [camelcase(name)]: feature,
    [`min${[titleizedName]}`]: minFeature,
    [`max${[titleizedName]}`]: maxFeature,
    [`above${[titleizedName]}`]: aboveFeature,
    [`below${[titleizedName]}`]: belowFeature,
    [`between${[titleizedName]}s`]: betweenFeatures,
    [`at${[titleizedName]}Breakpoint`]: atFeatureBreakpoint,
    [`at${[titleizedName]}`]: atFeature,
  };

  return exports;
};
