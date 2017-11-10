import { css } from 'styled-components';
import {
  keys,
  compose,
  map,
  zipObj,
  prop,
  sort,
  toPairs,
  sortBy,
  reverse,
  find,
  indexOf,
  findIndex,
  propEq,
  nth,
} from 'ramda';

const MEDIA_TYPES = Object.freeze({
  ALL: 'all',
  PRINT: 'print',
  SCREEN: 'screen',
  SPEECH: 'speech',
});

const UNITS = Object.freeze({
  EM: 'em',
  PX: 'px',
});

const DEFAULT_MEDIA_TYPE = MEDIA_TYPES.SCREEN;
const DEFAULT_UNIT = UNITS.EM;
const DEFAULT_BASE_FONT_SIZE = 16;

const appendUnit = (value, unit) => `${value}${unit}`;

const getUnit = () => DEFAULT_UNIT;

const getBaseFontSize = () => DEFAULT_BASE_FONT_SIZE;

const pxToEm = px => px / getBaseFontSize();

const toBreakpointArray = compose(map(zipObj(['name', 'value'])), toPairs);

const withUnit = value => {
  const unit = getUnit();
  console.log(value, unit);
  if (unit === UNITS.EM) {
    return appendUnit(pxToEm(value), UNITS.EM);
  } else {
    return appendUnit(value, UNITS.PX);
  }
};

// Each breakpoint represent the area from its value and below until the next
// breakpoint or zero.
const breakpoints = {
  small: 400, // 0–400
  medium: 900, // 400–900
  large: 1100, // 900–1100
  xLarge: 1300, // 1100–1300
};

const breakpointsArray = compose(reverse, sort(prop('value')))(
  toBreakpointArray(breakpoints)
);

const getUpperLimit = breakpoint => {
  const index = findIndex(propEq('name', breakpoint))(breakpointsArray);
  return compose(prop('name'), nth(index + 1))(breakpointsArray);
};

// const previousBreakpoint = (name) => {
//   breakpoints.
// }

const breakpointExtents = breakpoint => [
  getLowExtent(breakpoint),
  getBreakpoint(breakpoint),
];

const missingBreakpointErrorMessage = name =>
  `There is no breakpoint defined called '${name}', only: ${keys(
    breakpoints
  )} are defined.`;

const getBreakpoint = name => {
  const value = breakpoints[name];
  if (!value) throw new Error(missingBreakpointErrorMessage(name));
  return value;
};

const minWidth = breakpoint =>
  `(min-width: ${withUnit(getBreakpoint(breakpoint))})`;
const maxWidth = breakpoint =>
  `(max-width: ${withUnit(getBreakpoint(breakpoint))})`;

const aboveWidth = (from, ...contents) => css`
  @media ${DEFAULT_MEDIA_TYPE} and ${minWidth(from)} {
    ${contents};
  }
`;

const belowWidth = (to, ...contents) => css`
  @media ${DEFAULT_MEDIA_TYPE} and ${maxWidth(to)} {
    ${css(contents)};
  }
`;

const betweenWidths = (from, to, ...contents) => css`
  @media ${DEFAULT_MEDIA_TYPE} and ${minWidth(from)} and ${maxWidth(to)} {
    ${css(contents)};
  }
`;

const atBreakpoint = (breakpoint, ...contents) => {
  const nextBreakpointWider = getUpperLimit(breakpoint);
  if (nextBreakpointWider) {
    return betweenWidths(breakpoint, nextBreakpointWider, ...contents);
  } else {
    return aboveWidth(breakpoint, ...contents);
  }
};

export default {
  aboveWidth,
  belowWidth,
  betweenWidths,
  atBreakpoint,
};
