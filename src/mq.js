import { css } from 'styled-components';
import {
  keys,
  compose,
  map,
  zipObj,
  prop,
  sort,
  toPairs,
  reverse,
  findIndex,
  propEq,
  nth,
} from 'ramda';
import { validateBreakpoints, validateConfig } from './validations';
import { MEDIA_TYPES, UNITS } from './const';
import { appendUnit } from './utils';

const SEPARATOR_VALUE = 0.01;
const PREFIX = '@media';

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

  const pxToEm = px => px / baseFontSize;

  const toBreakpointArray = compose(map(zipObj(['name', 'value'])), toPairs);
  const orderByValue = compose(reverse, sort(prop('value')));

  const withUnit = value =>
    appendUnit(unit === UNITS.EM ? pxToEm(value) : value, unit);

  const breakpointsArray = orderByValue(toBreakpointArray(breakpoints));

  const getUpperLimit = breakpoint => {
    const index = findIndex(propEq('name', breakpoint))(breakpointsArray);
    return compose(prop('name'), nth(index + 1))(breakpointsArray);
  };

  const missingBreakpointErrorMessage = name =>
    `There is no breakpoint defined called '${name}', only: '${keys(
      breakpoints
    )}' are defined.`;

  const getBreakpoint = name => {
    const value = breakpoints[name];
    if (!value) throw new Error(missingBreakpointErrorMessage(name));
    return value;
  };

  const buildQueryDefinition = (...elements) =>
    `${PREFIX} ${elements.join(' and ')}`;

  const buildQuery = (definition, content) => css`
    ${definition} {
      ${content};
    }
  `;

  // ---------------------------------------------------------------------------
  // API
  // ---------------------------------------------------------------------------

  const minWidth = breakpoint =>
    `(min-width: ${withUnit(getBreakpoint(breakpoint))})`;

  const maxWidth = breakpoint => {
    const breakpointValue = getBreakpoint(breakpoint);
    // If using ems, try and avoid any overlap in media queries by reducing the value of max-width queries so they don't run up against min-width queries.
    return `(max-width: ${withUnit(
      unit === UNITS.EM && separateIfEms
        ? breakpointValue - SEPARATOR_VALUE
        : breakpointValue
    )})`;
  };

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
  ) => (stringParts, ...interpolationValues) =>
    buildQuery(
      buildQueryDefinition(config.mediaType, minWidth(from), maxWidth(to)),
      css(stringParts, ...interpolationValues)
    );

  const atWidthBreakpoint = (
    breakpoint,
    config = { mediaType: defaultMediaType }
  ) => (stringParts, ...interpolationValues) => {
    const nextBreakpointWider = getUpperLimit(breakpoint);
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
    atWidthBreakpoint,
    minWidth,
    maxWidth,
  };
};

export default {
  configure,
};
