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

// See: http://tzi.fr/css/prevent-double-breakpoint
const SEPARATOR_VALUE = 0.01;

const appendUnit = (value, unit) => `${value}${unit}`;

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

  const pxToEm = px => px / baseFontSize;

  const toBreakpointArray = compose(map(zipObj(['name', 'value'])), toPairs);

  const withUnit = value => {
    if (unit === UNITS.EM) {
      return appendUnit(pxToEm(value), UNITS.EM);
    }
    return appendUnit(value, UNITS.PX);
  };

  const breakpointsArray = () =>
    compose(reverse, sort(prop('value')))(toBreakpointArray(breakpoints));

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

  const minWidth = breakpoint =>
    `(min-width: ${withUnit(getBreakpoint(breakpoint))})`;

  const maxWidth = breakpoint => {
    // If using ems, try and avoid any overlap in media queries by reducing the value of max-width queries so they don't run up against min-width queries.
    if (unit === UNITS.EM && separateIfEms) {
      return `(max-width: ${withUnit(
        getBreakpoint(breakpoint) - SEPARATOR_VALUE
      )})`;
    }
    return `(max-width: ${withUnit(getBreakpoint(breakpoint))})`;
  };

  const aboveWidth = from => (stringParts, ...interpolationValues) =>
    css`
      @media ${defaultMediaType} and ${minWidth(from)} {
        ${css(stringParts, ...interpolationValues)};
      }
    `;

  const belowWidth = to => (stringParts, ...interpolationValues) =>
    css`
      @media ${defaultMediaType} and ${maxWidth(to)} {
        ${css(stringParts, ...interpolationValues)};
      }
    `;

  const betweenWidths = (from, to) => (stringParts, ...interpolationValues) =>
    css`
      @media ${defaultMediaType} and ${minWidth(from)} and ${maxWidth(to)} {
        ${css(stringParts, ...interpolationValues)};
      }
    `;

  const atBreakpoint = breakpoint => (stringParts, ...interpolationValues) => {
    const nextBreakpointWider = getUpperLimit(breakpoint);
    if (nextBreakpointWider) {
      return betweenWidths(breakpoint, nextBreakpointWider)(
        stringParts,
        ...interpolationValues
      );
    }
    return aboveWidth(breakpoint)(stringParts, ...interpolationValues);
  };

  return {
    aboveWidth,
    belowWidth,
    betweenWidths,
    atBreakpoint,
  };
};

export default {
  configure,
};
