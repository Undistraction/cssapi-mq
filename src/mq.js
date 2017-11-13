import { css } from 'styled-components';
import { partial } from 'ramda';
import { validateBreakpoints, validateConfig } from './validations';
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
} from './utils';
import {
  throwError,
  missingBreakpointErrorMessage,
  sameBreakpointsForBetweenErrrorMessage,
} from './errors';

const configure = (
  breakpoints,
  {
    baseFontSize = 16,
    defaultMediaType = MEDIA_TYPES.SCREEN,
    unit = UNITS.EM,
    separateIfEms = true,
  } = {}
) => {
  validateBreakpoints(breakpoints);
  validateConfig({
    baseFontSize,
    defaultMediaType,
    unit,
    separateIfEms,
  });

  // ---------------------------------------------------------------------------
  // UTILS
  // ---------------------------------------------------------------------------

  const breakpointsArray = orderByValue(toBreakpointArray(breakpoints));

  const getUpperLimitWithBreakpoints = partial(getUpperLimit, [
    breakpointsArray,
  ]);
  const missingBreakpointErrorMessageWithBreakpoints = partial(
    missingBreakpointErrorMessage,
    [breakpoints]
  );
  const toOutputWithUnit = partial(toOutput, [unit, baseFontSize]);

  const ensureBreakpointOrderWithBreakpoints = partial(ensureBreakpointOrder, [
    breakpoints,
  ]);

  const getBreakpoint = name => {
    const value = breakpoints[name];
    if (!value) throwError(missingBreakpointErrorMessageWithBreakpoints(name));
    return value;
  };

  // ---------------------------------------------------------------------------
  // API
  // ---------------------------------------------------------------------------

  // Media Query Elements
  // ---------------------------------------------------------------------------

  const minWidth = breakpoint =>
    `(min-width: ${toOutputWithUnit(getBreakpoint(breakpoint))})`;

  const maxWidth = breakpoint => {
    const breakpointValue = getBreakpoint(breakpoint);
    // If using ems, try and avoid any overlap in media queries by reducing the value of max-width queries so they don't run up against min-width queries.
    return `(max-width: ${toOutputWithUnit(
      unitIsRemOrEm(unit) && separateIfEms
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
      buildQueryDefinition(config.mediaType, minWidth(from)),
      css(stringParts, ...interpolationValues)
    );

  const belowWidth = (to, config = { mediaType: defaultMediaType }) => (
    stringParts,
    ...interpolationValues
  ) =>
    buildQuery(
      buildQueryDefinition(config.mediaType, maxWidth(to)),
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
      buildQueryDefinition(config.mediaType, minWidth(lower), maxWidth(higher)),
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
  };
};

export default {
  configure,
};
