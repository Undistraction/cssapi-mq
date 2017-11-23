import { map, prop, compose } from 'ramda';
import camelcase from 'camelcase';

import dimensionsOutput from './output/dimensionsOutput';
import resolutionOutput from './output/resolutionOutput';
import aspectRatioOutput from './output/aspectRatioOutput';
import colorOutput from './output/colorOutput';
import monochromeOutput from './output/monochromeOutput';

export const ORIENTATION = Object.freeze(['portrait', 'landscape']);
export const SCAN = Object.freeze(['interlace', 'progressive']);
export const GRID = Object.freeze([0, 1]);
export const UPDATE = Object.freeze(['none', 'slow', 'fast']);
export const OVERFLOW_BLOCK = Object.freeze([
  'none',
  'scroll',
  'optional-paged',
]);
export const OVERFLOW_INLINE = Object.freeze(['none', 'scroll']);
export const COLOR_GAMUT = Object.freeze(['srgb', 'p3', 'rec2020']);
export const DISPLAY_MODE = Object.freeze([
  'fullscreen',
  'standalone',
  'minimal-ui',
  'browser',
]);

export const LINEAR_FEATURES = [
  {
    name: 'orientation',
    validValues: ORIENTATION,
  },
  {
    name: 'scan',
    validValues: SCAN,
  },
  {
    name: 'grid',
    validValues: GRID,
    allowNoArgument: true,
  },
  {
    name: 'update',
    validValues: UPDATE,
    allowNoArgument: true,
  },
  {
    name: 'overflowBlock',
    validValues: OVERFLOW_BLOCK,
  },
  {
    name: 'overflowInline',
    validValues: OVERFLOW_INLINE,
  },
  {
    name: 'colorGamut',
    validValues: COLOR_GAMUT,
  },
  {
    name: 'displayMode',
    validValues: DISPLAY_MODE,
  },
];

export const RANGED_FEATURES = [
  {
    name: 'width',
    output: dimensionsOutput,
  },
  {
    name: 'height',
    output: dimensionsOutput,
  },
  {
    name: 'resolution',
    output: resolutionOutput,
  },
  {
    name: 'aspect-ratio',
    output: aspectRatioOutput,
  },
  {
    name: 'color',
    output: colorOutput,
    config: {
      allowNoArgument: true,
    },
  },
  {
    name: 'color-index',
    output: colorOutput,
    config: {
      allowNoArgument: true,
    },
  },
  {
    name: 'monochrome',
    output: monochromeOutput,
    config: {
      allowNoArgument: true,
    },
  },
];

export const rangedFeatureNames = map(compose(camelcase, prop('name')))(
  RANGED_FEATURES
);
