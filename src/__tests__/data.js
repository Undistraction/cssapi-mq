import { keys } from 'ramda';
import camelcase from 'camelcase';
import styledMQ from '../mq';

export const genericInvalidValues = [
  '',
  null,
  undefined,
  true,
  false,
  [],
  undefined,
];

export const validDimensionBreakpointsUnitless = {
  small: 400,
  medium: 900,
  large: 1100,
  xLarge: 1300,
};

export const validResolutionBreakpointsUnitless = {
  small: 72,
  medium: 150,
  large: 300,
  xLarge: 600,
};

export const validResolutionBreakpointsUnited = {
  small: '72dpi',
  medium: '150dpi',
  large: '300dpi',
  xLarge: '600dpi',
};

export const validAspectRatioBreakpoints = {
  small: '2/3',
  medium: '1/1',
  large: '3/2',
  xLarge: '16/9',
};

export const validColorBreakpoints = {
  small: 1,
  medium: 4,
  large: 5,
  xLarge: 6,
};

export const validMonochromeBreakpoints = {
  small: 0,
  medium: 4,
  large: 8,
  xLarge: 16,
};

export const validBreakpoints = {
  width: validDimensionBreakpointsUnitless,
  height: validDimensionBreakpointsUnitless,
  resolution: validResolutionBreakpointsUnitless,
  aspectRatio: validAspectRatioBreakpoints,
  color: validColorBreakpoints,
  colorIndex: validColorBreakpoints,
  monochrome: validMonochromeBreakpoints,
};

export const validBreakpointsForRange = name => {
  const camelisedName = camelcase(name);
  const o = {};
  o[camelisedName] = validBreakpoints[camelisedName];
  return o;
};

export const mqWithValidBreakpointsForRange = (name, config = {}) =>
  styledMQ.configure(validBreakpointsForRange(name), config);

export const validBreakpointKeysForRange = name => {
  const camelisedName = camelcase(name);
  return keys(validBreakpointsForRange(name)[camelisedName]);
};

export const mqWithTweakedBreakpointsForRange = name =>
  styledMQ
    .configure(validBreakpointsForRange(name))
    .tweak({ width: { alpha: 300 } });

export const mqWithNoBreakpoints = () => styledMQ.configure({});
