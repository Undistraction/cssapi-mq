import { css } from 'styled-components';
import { partial } from 'ramda';
import {
  validateBreakpointMapNames,
  validateBreakpointSet,
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
  sameBreakpointsForBetweenErrrorMessage,
  invalidMediaTypeErrorMessage,
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
  validateBreakpointSet('width', widthBreakpoints);
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

  const ensureBreakpointOrderWithBreakpoints = partial(ensureBreakpointOrder, [
    widthBreakpoints,
  ]);

  const getWidthBreakpoint = name => {
    const value = widthBreakpoints[name];
    if (!value) throwError(missingBreakpointErrorMessageWithBreakpoints(name));
    return value;
  };

  // ---------------------------------------------------------------------------
  // API
  // ---------------------------------------------------------------------------

  // Media Query Elements
  // ---------------------------------------------------------------------------

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

  const minHeight = breakpoint =>
    `(min-height: ${toOutputWithUnit(getWidthBreakpoint(breakpoint))})`;

  const maxHeight = breakpoint => {
    const breakpointValue = getWidthBreakpoint(breakpoint);
    // If using ems, try and avoid any overlap in media queries by reducing the value of max-width queries so they don't run up against min-width queries.
    return `(max-height: ${toOutputWithUnit(
      unitIsRemOrEm(unit) && shouldSeparateQueries
        ? breakpointValue - SEPARATOR_VALUE
        : breakpointValue
    )})`;
  };

  const mediaType = (mediaTypes = [defaultMediaType]) => {
    const mediaTypesArray = ensureArray(mediaTypes);
    if (!mediaTypesAreValid(mediaTypesArray))
      throwError(invalidMediaTypeErrorMessage(mediaTypesArray));
    return mediaTypesArray.join(', ');
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
    if (from === to) throwError(sameBreakpointsForBetweenErrrorMessage(from));
    const [lower, higher] = ensureBreakpointOrderWithBreakpoints(from, to);
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

  // ---------------------------------------------------------------------------
  // Export
  // ---------------------------------------------------------------------------

  return {
    aboveWidth,
    belowWidth,
    betweenWidths,
    atWidth,
    minWidth,
    maxWidth,
    mediaType,
  };
};

export default {
  configure,
};
