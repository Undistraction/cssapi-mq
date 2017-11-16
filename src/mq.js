import { css } from 'styled-components';
import { partial, findIndex, __ } from 'ramda';
import {
  validateBreakpointSets,
  validateConfig,
  mediaTypesAreValid,
  validateOrientation,
  validateBreakpoints,
} from './validations';
import { MEDIA_TYPES, UNITS, SEPARATOR_VALUE } from './const';
import {
  orderByValue,
  toBreakpointArray,
  getUpperLimit,
  toOutput,
  unitIsRemOrEm,
  buildQuery,
  buildQueryDefinition,
  ensureArray,
  buildFeature,
  propEqName,
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
  } = {}
) => {
  validateBreakpoints(breakpoints);
  const { width: widthBreakpoints, height: heightBreakpoints } = breakpoints;

  validateBreakpointSets(breakpoints);

  validateConfig({
    baseFontSize,
    defaultMediaType,
    unit,
    shouldSeparateQueries,
  });

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

  // Width

  const minWidth = breakpoint =>
    `(min-width: ${toOutputWithUnit(getWidthBreakpoint(breakpoint))})`;

  const maxWidth = breakpoint => {
    const breakpointValue = getWidthBreakpoint(breakpoint);
    // If using ems, try and avoid any overlap in media queries by reducing the value of max-width queries so they don't run up against min-width queries.
    return `(max-width: ${toOutputWithUnit(
      unitIsRemOrEm(unit) && shouldSeparateQueries
        ? breakpointValue - SEPARATOR_VALUE
        : breakpointValue
    )})`;
  };

  // Height

  const minHeight = breakpoint =>
    `(min-height: ${toOutputWithUnit(getHeightBreakpoint(breakpoint))})`;

  const maxHeight = breakpoint => {
    const breakpointValue = getHeightBreakpoint(breakpoint);
    // If using ems, try and avoid any overlap in media queries by reducing the value of max-width queries so they don't run up against min-width queries.
    return `(max-height: ${toOutputWithUnit(
      unitIsRemOrEm(unit) && shouldSeparateQueries
        ? breakpointValue - SEPARATOR_VALUE
        : breakpointValue
    )})`;
  };

  // Media Queries
  // ---------------------------------------------------------------------------

  const aboveWidth = (from, config = { mediaType: defaultMediaType }) => (
    stringParts,
    ...interpolationValues
  ) =>
    buildQuery(
      buildQueryDefinition(mediaType(config.mediaType), minWidth(from)),
      css(stringParts, ...interpolationValues)
    );

  const belowWidth = (to, config = { mediaType: defaultMediaType }) => (
    stringParts,
    ...interpolationValues
  ) =>
    buildQuery(
      buildQueryDefinition(mediaType(config.mediaType), maxWidth(to)),
      css(stringParts, ...interpolationValues)
    );

  const betweenWidths = (
    from,
    to,
    config = { mediaType: defaultMediaType }
  ) => (stringParts, ...interpolationValues) => {
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

  const atWidthBreakpoint = (
    breakpoint,
    config = { mediaType: defaultMediaType }
  ) => (stringParts, ...interpolationValues) => {
    const breakpointAbove = getBreakpointAboveWidth(breakpoint);
    if (breakpointAbove) {
      return betweenWidths(breakpoint, breakpointAbove, config)(
        stringParts,
        ...interpolationValues
      );
    }
    return aboveWidth(breakpoint, config)(stringParts, ...interpolationValues);
  };

  const aboveHeight = (from, config = { mediaType: defaultMediaType }) => (
    stringParts,
    ...interpolationValues
  ) =>
    buildQuery(
      buildQueryDefinition(mediaType(config.mediaType), minHeight(from)),
      css(stringParts, ...interpolationValues)
    );

  const belowHeight = (to, config = { mediaType: defaultMediaType }) => (
    stringParts,
    ...interpolationValues
  ) =>
    buildQuery(
      buildQueryDefinition(mediaType(config.mediaType), maxHeight(to)),
      css(stringParts, ...interpolationValues)
    );

  const betweenHeights = (
    from,
    to,
    config = { mediaType: defaultMediaType }
  ) => (stringParts, ...interpolationValues) => {
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

  const atHeightBreakpoint = (
    breakpoint,
    config = { mediaType: defaultMediaType }
  ) => (stringParts, ...interpolationValues) => {
    const breakpointAbove = getBreakpointAboveHeight(breakpoint);
    if (breakpointAbove) {
      return betweenHeights(breakpoint, breakpointAbove, config)(
        stringParts,
        ...interpolationValues
      );
    }
    return aboveHeight(breakpoint, config)(stringParts, ...interpolationValues);
  };

  // ---------------------------------------------------------------------------
  // Export
  // ---------------------------------------------------------------------------

  return {
    mediaType,
    orientation,
    minWidth,
    maxWidth,
    minHeight,
    maxHeight,
    aboveWidth,
    belowWidth,
    betweenWidths,
    atWidthBreakpoint,
    aboveHeight,
    belowHeight,
    betweenHeights,
    atHeightBreakpoint,
  };
};

export default {
  configure,
};
