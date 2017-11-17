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
  orderByValue,
  toBreakpointArray,
  getUpperLimit,
  toOutput,
  buildQuery,
  buildQueryDefinition,
  ensureArray,
  buildFeature,
  propEqName,
  separatorValueForUnit,
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
  const { width: widthBreakpoints, height: heightBreakpoints } = breakpoints;

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

  const widthBreakpointArray = orderByValue(
    toBreakpointArray(widthBreakpoints)
  );
  const heightBreakpointArray = orderByValue(
    toBreakpointArray(heightBreakpoints)
  );

  const findIndexInWidthBreakpointArray = findIndex(__, widthBreakpointArray);
  const findIndexInHeightBreakpointArray = findIndex(__, heightBreakpointArray);

  const getBreakpointAboveWidth = partial(getUpperLimit, [
    widthBreakpointArray,
  ]);
  const getBreakpointAboveHeight = partial(getUpperLimit, [
    heightBreakpointArray,
  ]);
  const missingBreakpointErrorMessageWithBreakpoints = partial(
    missingBreakpointErrorMessage,
    [widthBreakpoints]
  );
  const toOutputWithUnit = partial(toOutput, [unit, baseFontSize]);

  const getWidthBreakpoint = name => {
    if (!widthBreakpoints) throwError(mssingBreakpointMapErrorMessage('width'));
    const value = widthBreakpoints[name];
    if (!value)
      throwError(missingBreakpointErrorMessageWithBreakpoints('width', name));
    return value;
  };

  const getHeightBreakpoint = name => {
    if (!heightBreakpoints)
      throwError(mssingBreakpointMapErrorMessage('height'));
    const value = heightBreakpoints[name];
    if (!value)
      throwError(missingBreakpointErrorMessageWithBreakpoints('height', name));
    return value;
  };

  const retrieveWidthBreakpointIfNeeded = when(
    always(errorIfNoBreakpointDefined),
    getWidthBreakpoint
  );

  const retrieveHeightBreakpointIfNeeded = when(
    always(errorIfNoBreakpointDefined),
    getHeightBreakpoint
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

  // ---------------------------------------------------------------------------
  // API
  // ---------------------------------------------------------------------------

  // Media Query Elements
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

  const width = breakpoint =>
    buildFeature('width', parseWidthValue(breakpoint));
  const minWidth = breakpoint =>
    buildFeature('min-width', parseWidthValue(breakpoint));
  const maxWidth = breakpoint =>
    buildFeature('max-width', parseWidthValue(breakpoint, true));

  // Height

  const height = breakpoint =>
    buildFeature('height', parseHeightValue(breakpoint));
  const minHeight = breakpoint =>
    buildFeature('min-height', parseHeightValue(breakpoint));
  const maxHeight = breakpoint =>
    buildFeature('max-height', parseHeightValue(breakpoint, true));

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
    const fromIndex = findIndexInWidthBreakpointArray(propEqName(from));
    const toIndex = findIndexInWidthBreakpointArray(propEqName(to));

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
    const breakpointAbove = getBreakpointAboveWidth(breakpoint);
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

    const fromIndex = findIndexInHeightBreakpointArray(propEqName(from));
    const toIndex = findIndexInHeightBreakpointArray(propEqName(to));

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
    const breakpointAbove = getBreakpointAboveHeight(breakpoint);
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
