import { css } from 'styled-components';

import {
  partial,
  findIndex,
  __,
  mergeDeepLeft,
  when,
  always,
  subtract,
  compose,
} from 'ramda';

import {
  validateBreakpointSets,
  validateConfig,
  mediaTypesAreValid,
  validateOrientation,
  validateBreakpoints,
} from './validations';

import { MEDIA_TYPES, UNITS } from './const';

import {
  getUpperLimit,
  toOutput,
  buildQuery,
  buildQueryDefinition,
  ensureArray,
  buildFeature,
  propEqName,
  separatorValueForUnit,
  orderdBreakpoints,
} from './utils';

import {
  throwError,
  missingBreakpointErrorMessage,
  sameBreakpointsForBetweenErrorMessage,
  invalidMediaTypeErrorMessage,
  mssingBreakpointMapErrorMessage,
} from './errors';

const configure = (
  breakpoints,
  {
    baseFontSize = 16,
    defaultMediaType = MEDIA_TYPES.SCREEN,
    unit = UNITS.EM,
    shouldSeparateQueries = true,
    errorIfNoBreakpointDefined = true,
  } = {}
) => {
  validateBreakpoints(breakpoints);
  validateBreakpointSets(breakpoints);

  validateConfig({
    baseFontSize,
    defaultMediaType,
    unit,
    shouldSeparateQueries,
  });

  const defaultAPIConfig = { mediaType: defaultMediaType };

  // ---------------------------------------------------------------------------
  // UTILS
  // ---------------------------------------------------------------------------

  const orderedBreakpoints = orderdBreakpoints(breakpoints);

  const indexOfBreakpointNamed = (name, value) =>
    findIndex(value, orderedBreakpoints[name]);

  const nextBreakpointAboveNamed = (value, breakpoint) =>
    getUpperLimit(orderedBreakpoints[value], breakpoint);

  const toOutputWithUnit = partial(toOutput, [unit, baseFontSize]);

  const getBreakpointNamed = (feature, name) => {
    if (!breakpoints[feature])
      throwError(mssingBreakpointMapErrorMessage(feature));
    const value = breakpoints[feature][name];
    if (!value)
      throwError(missingBreakpointErrorMessage(name, breakpoints[feature]));
    return value;
  };

  const retrieveWidthBreakpointIfNeeded = when(
    always(errorIfNoBreakpointDefined),
    partial(getBreakpointNamed, ['width'])
  );

  const retrieveHeightBreakpointIfNeeded = when(
    always(errorIfNoBreakpointDefined),
    partial(getBreakpointNamed, ['height'])
  );

  const parseWidthValue = (value, shouldSeparate = false) => {
    const prepareUnitlessValue = when(
      always(shouldSeparate),
      subtract(__, separatorValueForUnit(unit))
    );

    return compose(
      toOutputWithUnit,
      prepareUnitlessValue,
      retrieveWidthBreakpointIfNeeded
    )(value);
  };

  const parseHeightValue = (value, shouldSeparate = false) => {
    const prepareUnitlessValue = when(
      always(shouldSeparate),
      subtract(__, separatorValueForUnit(unit))
    );

    return compose(
      toOutputWithUnit,
      prepareUnitlessValue,
      retrieveHeightBreakpointIfNeeded
    )(value);
  };

  const feature = (name, parser, shouldSeparate = false) => breakpoint =>
    buildFeature(name, parser(breakpoint, shouldSeparate));

  // ---------------------------------------------------------------------------
  // API
  // ---------------------------------------------------------------------------

  // Tweak
  // ---------------------------------------------------------------------------

  const tweak = (mq, tweakpoints) => {
    validateBreakpoints(tweakpoints);
    validateBreakpointSets(tweakpoints);
    const mergedBreakpoints = mergeDeepLeft(breakpoints, tweakpoints);
    mq.tweaked = configure(mergedBreakpoints, {
      baseFontSize,
      defaultMediaType,
      unit,
      shouldSeparateQueries,
    });
    return mq;
  };

  // Media Query Features
  // ---------------------------------------------------------------------------

  // Media Type

  const mediaType = (mediaTypes = [defaultMediaType]) => {
    const mediaTypesArray = ensureArray(mediaTypes);
    if (!mediaTypesAreValid(mediaTypesArray))
      throwError(invalidMediaTypeErrorMessage(mediaTypesArray));
    return mediaTypesArray.join(', ');
  };

  // Orientation

  const orientation = value => {
    validateOrientation(value);
    return buildFeature('orientation', value);
  };

  // Height

  const width = feature('width', parseWidthValue);
  const minWidth = feature('min-width', parseWidthValue);
  const maxWidth = feature('max-width', parseWidthValue, true);

  // Height

  const height = feature('height', parseHeightValue);
  const minHeight = feature('min-height', parseHeightValue);
  const maxHeight = feature('max-height', parseHeightValue, true);

  // Media Queries > Width
  // ---------------------------------------------------------------------------

  const aboveWidth = (from, config = defaultAPIConfig) => (
    stringParts,
    ...interpolationValues
  ) =>
    buildQuery(
      buildQueryDefinition(mediaType(config.mediaType), minWidth(from)),
      css(stringParts, ...interpolationValues)
    );

  const belowWidth = (to, config = defaultAPIConfig) => (
    stringParts,
    ...interpolationValues
  ) =>
    buildQuery(
      buildQueryDefinition(mediaType(config.mediaType), maxWidth(to)),
      css(stringParts, ...interpolationValues)
    );

  const betweenWidths = (from, to, config = defaultAPIConfig) => (
    stringParts,
    ...interpolationValues
  ) => {
    if (from === to) throwError(sameBreakpointsForBetweenErrorMessage(from));
    const fromIndex = indexOfBreakpointNamed('width', propEqName(from));
    const toIndex = indexOfBreakpointNamed('width', propEqName(to));

    const [lower, higher] = fromIndex < toIndex ? [from, to] : [to, from];
    return buildQuery(
      buildQueryDefinition(
        mediaType(config.mediaType),
        minWidth(lower),
        maxWidth(higher)
      ),
      css(stringParts, ...interpolationValues)
    );
  };

  const atWidthBreakpoint = (breakpoint, config = defaultAPIConfig) => (
    stringParts,
    ...interpolationValues
  ) => {
    const breakpointAbove = nextBreakpointAboveNamed('width', breakpoint);
    if (breakpointAbove) {
      return betweenWidths(breakpoint, breakpointAbove, config)(
        stringParts,
        ...interpolationValues
      );
    }
    return aboveWidth(breakpoint, config)(stringParts, ...interpolationValues);
  };

  const atWidth = (breakpoint, config = defaultAPIConfig) => (
    stringParts,
    ...interpolationValues
  ) =>
    buildQuery(
      buildQueryDefinition(mediaType(config.mediaType), width(breakpoint)),
      css(stringParts, ...interpolationValues)
    );

  // Media Queries > Height
  // ---------------------------------------------------------------------------

  const aboveHeight = (from, config = defaultAPIConfig) => (
    stringParts,
    ...interpolationValues
  ) =>
    buildQuery(
      buildQueryDefinition(mediaType(config.mediaType), minHeight(from)),
      css(stringParts, ...interpolationValues)
    );

  const belowHeight = (to, config = defaultAPIConfig) => (
    stringParts,
    ...interpolationValues
  ) =>
    buildQuery(
      buildQueryDefinition(mediaType(config.mediaType), maxHeight(to)),
      css(stringParts, ...interpolationValues)
    );

  const betweenHeights = (from, to, config = defaultAPIConfig) => (
    stringParts,
    ...interpolationValues
  ) => {
    if (from === to) throwError(sameBreakpointsForBetweenErrorMessage(from));

    const fromIndex = indexOfBreakpointNamed('height', propEqName(from));
    const toIndex = indexOfBreakpointNamed('height', propEqName(to));

    const [lower, higher] = fromIndex < toIndex ? [from, to] : [to, from];
    return buildQuery(
      buildQueryDefinition(
        mediaType(config.mediaType),
        minHeight(lower),
        maxHeight(higher)
      ),
      css(stringParts, ...interpolationValues)
    );
  };

  const atHeightBreakpoint = (breakpoint, config = defaultAPIConfig) => (
    stringParts,
    ...interpolationValues
  ) => {
    const breakpointAbove = nextBreakpointAboveNamed('height', breakpoint);
    if (breakpointAbove) {
      return betweenHeights(breakpoint, breakpointAbove, config)(
        stringParts,
        ...interpolationValues
      );
    }
    return aboveHeight(breakpoint, config)(stringParts, ...interpolationValues);
  };

  const atHeight = (breakpoint, config = defaultAPIConfig) => (
    stringParts,
    ...interpolationValues
  ) =>
    buildQuery(
      buildQueryDefinition(mediaType(config.mediaType), height(breakpoint)),
      css(stringParts, ...interpolationValues)
    );

  // ---------------------------------------------------------------------------
  // Export
  // ---------------------------------------------------------------------------

  const exports = {
    mediaType,
    orientation,
    width,
    minWidth,
    maxWidth,
    height,
    minHeight,
    maxHeight,
    aboveWidth,
    belowWidth,
    betweenWidths,
    atWidthBreakpoint,
    atWidth,
    aboveHeight,
    belowHeight,
    betweenHeights,
    atHeightBreakpoint,
    atHeight,
    tweak,
  };

  exports.tweak = partial(tweak, [exports]);

  return exports;
};

export default {
  configure,
};
