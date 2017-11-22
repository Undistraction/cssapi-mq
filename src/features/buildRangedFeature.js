import { findIndex, compose, isNil } from 'ramda';
import camelcase from 'camelcase';

import { css } from 'styled-components';

import { MEDIA_TYPES } from '../const';
import {
  throwError,
  sameBreakpointsForBetweenErrorMessage,
  missingBreakpointErrorMessage,
  mssingBreakpointMapErrorMessage,
} from '../errors';
import buildMediaType from './buildMediaType';

import { getUpperLimit, propEqName, toBreakpointArray } from '../utils';

import { renderQuery, renderQueryDefinition, renderFeature } from '../render';

const buildFeatureItem = (name, parser, config) => breakpoint => {
  return renderFeature(name, parser(breakpoint, config));
};

const nilValueAllowedToPass = (value, noArgs) => isNil(value) && noArgs;

export default (
  name,
  output,
  breakpoints = {},
  {
    defaultMediaType = MEDIA_TYPES.SCREEN,
    onlyNamedBreakpoints = true,
    allowNoArgument = false,
  } = {}
) => {
  const camelisedName = camelcase(name);

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

  const parseValue = (
    value,
    { shouldSeparate = false, noArgs = false } = {}
  ) => {
    // If we only support named breakpoints use the value to look up a
    // breakpoint.
    if (onlyNamedBreakpoints && !nilValueAllowedToPass(value, noArgs)) {
      value = getBreakpointNamed(value);
    }
    const outputValue = output(value, shouldSeparate);
    return outputValue;
  };

  const defaultAPIConfig = { mediaType: defaultMediaType };
  const mediaType = buildMediaType(defaultMediaType);

  const orderedBreakpoints = toBreakpointArray(breakpoints);
  const indexOfBreakpointNamed = value => findIndex(value, orderedBreakpoints);

  const nextBreakpointAboveNamed = value =>
    getUpperLimit(orderedBreakpoints, value);

  // ---------------------------------------------------------------------------
  // API
  // ---------------------------------------------------------------------------

  const feature = buildFeatureItem(name, parseValue, {
    noArgs: allowNoArgument,
  });
  const minFeature = buildFeatureItem(`min-${name}`, parseValue);
  const maxFeature = buildFeatureItem(`max-${name}`, parseValue, {
    shouldSeparate: true,
  });

  const aboveFeature = (from, config = defaultAPIConfig) => (
    stringParts,
    ...interpolationValues
  ) =>
    renderQuery(
      renderQueryDefinition(mediaType(config.mediaType), minFeature(from)),
      css(stringParts, ...interpolationValues)
    );

  const belowFeature = (to, config = defaultAPIConfig) => (
    stringParts,
    ...interpolationValues
  ) =>
    renderQuery(
      renderQueryDefinition(mediaType(config.mediaType), maxFeature(to)),
      css(stringParts, ...interpolationValues)
    );

  const betweenFeatures = (from, to, config = defaultAPIConfig) => (
    stringParts,
    ...interpolationValues
  ) => {
    if (from === to) throwError(sameBreakpointsForBetweenErrorMessage(from));
    const fromIndex = indexOfBreakpointNamed(propEqName(from));
    const toIndex = indexOfBreakpointNamed(propEqName(to));
    const [lower, higher] = fromIndex < toIndex ? [from, to] : [to, from];
    return renderQuery(
      renderQueryDefinition(
        mediaType(config.mediaType),
        minFeature(lower),
        maxFeature(higher)
      ),
      css(stringParts, ...interpolationValues)
    );
  };

  const atFeatureBreakpoint = (breakpoint, config = defaultAPIConfig) => (
    stringParts,
    ...interpolationValues
  ) => {
    const breakpointAbove = nextBreakpointAboveNamed(breakpoint);
    if (breakpointAbove) {
      return betweenFeatures(breakpoint, breakpointAbove, config)(
        stringParts,
        ...interpolationValues
      );
    }
    return aboveFeature(breakpoint, config)(
      stringParts,
      ...interpolationValues
    );
  };

  const atFeature = (breakpoint, config = defaultAPIConfig) => (
    stringParts,
    ...interpolationValues
  ) =>
    renderQuery(
      renderQueryDefinition(mediaType(config.mediaType), feature(breakpoint)),
      css(stringParts, ...interpolationValues)
    );
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
