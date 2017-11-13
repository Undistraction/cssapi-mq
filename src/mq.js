import { css } from 'styled-components';
import { partial, compose, toPairs, map } from 'ramda';
import {
  validateBreakpointMapNames,
  validateBreakpointSets,
  validateConfig,
  mediaTypesAreValid,
} from './validations';
import { MEDIA_TYPES, UNITS, SEPARATOR_VALUE } from './const';
import {
  orderByValue,
  toBreakpointArray,
  getUpperLimit,
  toOutput,
  ensureBreakpointOrder,
  unitIsRemOrEm,
  buildQuery,
  buildQueryDefinition,
  ensureArray,
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
  validateBreakpointMapNames(breakpoints);
  const widthBreakpoints = breakpoints.width;
  const heightBreakpoints = breakpoints.height;

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

  const breakpointsArray = orderByValue(toBreakpointArray(widthBreakpoints));

  const getUpperLimitWithBreakpoints = partial(getUpperLimit, [
    breakpointsArray,
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

  // Media Type

  const mediaType = (mediaTypes = [defaultMediaType]) => {
    const mediaTypesArray = ensureArray(mediaTypes);
    if (!mediaTypesAreValid(mediaTypesArray))
      throwError(invalidMediaTypeErrorMessage(mediaTypesArray));
    return mediaTypesArray.join(', ');
  };

  // Media Queries
  // ---------------------------------------------------------------------------

  // Width

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
    const [lower, higher] = ensureBreakpointOrder(widthBreakpoints, from, to);
    return buildQuery(
      buildQueryDefinition(
        mediaType(config.mediaType),
        minWidth(lower),
        maxWidth(higher)
      ),
      css(stringParts, ...interpolationValues)
    );
  };

  const atWidth = (breakpoint, config = { mediaType: defaultMediaType }) => (
    stringParts,
    ...interpolationValues
  ) => {
    const nextBreakpointWider = getUpperLimitWithBreakpoints(breakpoint);
    if (nextBreakpointWider) {
      return betweenWidths(breakpoint, nextBreakpointWider, config)(
        stringParts,
        ...interpolationValues
      );
    }
    return aboveWidth(breakpoint, config)(stringParts, ...interpolationValues);
  };

  // Height

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
    const [lower, higher] = ensureBreakpointOrder(heightBreakpoints, from, to);
    return buildQuery(
      buildQueryDefinition(
        mediaType(config.mediaType),
        minHeight(lower),
        maxHeight(higher)
      ),
      css(stringParts, ...interpolationValues)
    );
  };

  const atHeight = (breakpoint, config = { mediaType: defaultMediaType }) => (
    stringParts,
    ...interpolationValues
  ) => {
    const nextBreakpointWider = getUpperLimitWithBreakpoints(breakpoint);
    if (nextBreakpointWider) {
      return betweenHeights(breakpoint, nextBreakpointWider, config)(
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
    aboveWidth,
    belowWidth,
    betweenWidths,
    atWidth,
    aboveHeight,
    belowHeight,
    betweenHeights,
    atHeight,
    minWidth,
    maxWidth,
    minHeight,
    maxHeight,
    mediaType,
  };
};

export default {
  configure,
};
