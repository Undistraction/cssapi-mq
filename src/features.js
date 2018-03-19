import { __, find, propEq, map, prop, compose } from 'ramda'
import camelcase from 'camelcase'
import dasherize from 'dasherize'

import dimensionsValueRenderer from './renderers/valueRenderers/dimensionsValueRenderer'
import resolutionValueRenderer from './renderers/valueRenderers/resolutionValueRenderer'
import aspectRatioValueRenderer from './renderers/valueRenderers/aspectRatioValueRenderer'
import colorValueRenderer from './renderers/valueRenderers/colorValueRenderer'
import monochromeValueRenderer from './renderers/valueRenderers/monochromeValueRenderer'

import dimensionValidator from './validators/features/dimensionValidator'
import resolutionValidator from './validators/features/resolutionValidator'
import aspectRatioValidator from './validators/features/aspectRatioValidator'
import colorValidator from './validators/features/colorValidator'
import monochromeValidator from './validators/features/monochromeValidator'

export const ORIENTATION = Object.freeze([`portrait`, `landscape`])
export const SCAN = Object.freeze([`interlace`, `progressive`])
export const GRID = Object.freeze([0, 1])
export const UPDATE = Object.freeze([`none`, `slow`, `fast`])
export const OVERFLOW_BLOCK = Object.freeze([
  `none`,
  `scroll`,
  `optional-paged`,
])
export const OVERFLOW_INLINE = Object.freeze([`none`, `scroll`])
export const COLOR_GAMUT = Object.freeze([`srgb`, `p3`, `rec2020`])
export const DISPLAY_MODE = Object.freeze([
  `fullscreen`,
  `standalone`,
  `minimal-ui`,
  `browser`,
])

export const LINEAR_FEATURES = [
  {
    name: `orientation`,
    validValues: ORIENTATION,
  },
  {
    name: `scan`,
    validValues: SCAN,
  },
  {
    name: `grid`,
    validValues: GRID,
    allowNoArgument: true,
  },
  {
    name: `update`,
    validValues: UPDATE,
    allowNoArgument: true,
  },
  {
    name: `overflow-block`,
    validValues: OVERFLOW_BLOCK,
  },
  {
    name: `overflow-inline`,
    validValues: OVERFLOW_INLINE,
  },
  {
    name: `color-gamut`,
    validValues: COLOR_GAMUT,
  },
  {
    name: `display-mode`,
    validValues: DISPLAY_MODE,
  },
]

export const RANGED_FEATURES = [
  {
    name: `width`,
    valueRenderer: dimensionsValueRenderer,
    validator: dimensionValidator,
  },
  {
    name: `height`,
    valueRenderer: dimensionsValueRenderer,
    validator: dimensionValidator,
  },
  {
    name: `resolution`,
    valueRenderer: resolutionValueRenderer,
    validator: resolutionValidator,
  },
  {
    name: `aspect-ratio`,
    valueRenderer: aspectRatioValueRenderer,
    validator: aspectRatioValidator,
  },
  {
    name: `color`,
    valueRenderer: colorValueRenderer,
    validator: colorValidator,
    config: {
      allowNoArgument: true,
    },
  },
  {
    name: `color-index`,
    valueRenderer: colorValueRenderer,
    validator: colorValidator,
    config: {
      allowNoArgument: true,
    },
  },
  {
    name: `monochrome`,
    valueRenderer: monochromeValueRenderer,
    validator: monochromeValidator,
    config: {
      allowNoArgument: true,
    },
  },
]

export const rangedFeatureNames = map(compose(camelcase, prop(`name`)))(
  RANGED_FEATURES
)

export const rangedFeatureNamed = compose(
  find(__, RANGED_FEATURES),
  propEq(`name`),
  dasherize
)
