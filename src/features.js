import { map, prop, compose } from 'ramda';
import camelcase from 'camelcase';

import dimensionsValueRenderer from './renderers/valueRenderers/dimensionsValueRenderer';
import resolutionValueRenderer from './renderers/valueRenderers/resolutionValueRenderer';
import aspectRatioValueRenderer from './renderers/valueRenderers/aspectRatioValueRenderer';
import colorValueRenderer from './renderers/valueRenderers/colorValueRenderer';
import monochromeValueRenderer from './renderers/valueRenderers/monochromeValueRenderer';

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
    name: 'overflow-block',
    validValues: OVERFLOW_BLOCK,
  },
  {
    name: 'overflow-inline',
    validValues: OVERFLOW_INLINE,
  },
  {
    name: 'color-gamut',
    validValues: COLOR_GAMUT,
  },
  {
    name: 'display-mode',
    validValues: DISPLAY_MODE,
  },
];

export const RANGED_FEATURES = [
  {
    name: 'width',
    valueRenderer: dimensionsValueRenderer,
  },
  {
    name: 'height',
    valueRenderer: dimensionsValueRenderer,
  },
  {
    name: 'resolution',
    valueRenderer: resolutionValueRenderer,
  },
  {
    name: 'aspect-ratio',
    valueRenderer: aspectRatioValueRenderer,
  },
  {
    name: 'color',
    valueRenderer: colorValueRenderer,
    config: {
      allowNoArgument: true,
    },
  },
  {
    name: 'color-index',
    valueRenderer: colorValueRenderer,
    config: {
      allowNoArgument: true,
    },
  },
  {
    name: 'monochrome',
    valueRenderer: monochromeValueRenderer,
    config: {
      allowNoArgument: true,
    },
  },
];

export const rangedFeatureNames = map(compose(camelcase, prop('name')))(
  RANGED_FEATURES
);
