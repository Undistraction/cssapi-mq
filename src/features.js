import validateIsNonNegativeValidInteger from './validations/validators/validateIsNonNegativeValidInteger'
import validateIsDimension from './validations//validators/validateIsDimension'
import validateIsResolution from './validations/validators/validateIsResolution'
import validateIsAspectRatio from './validations/validators/validateIsAspectRatio'
import dimensionTransformer from './validations/transformers/dimensionTransformer'
import resolutionTransformer from './validations/transformers/resolutionTransformer'
import identityTransformer from './validations/transformers/identityTransformer'
import { LINEAR_FEATURE_NAMES, RANGED_FEATURE_NAMES } from './const'

export const LINEAR_FEATURES = [
  {
    name: LINEAR_FEATURE_NAMES.ORIENTATION,
    validValues: Object.freeze([`portrait`, `landscape`]),
  },
  {
    name: LINEAR_FEATURE_NAMES.SCAN,
    validValues: Object.freeze([`interlace`, `progressive`]),
  },
  {
    name: LINEAR_FEATURE_NAMES.GRID,
    validValues: Object.freeze([0, 1]),
    allowNoArgument: true,
  },
  {
    name: LINEAR_FEATURE_NAMES.UPDATE,
    validValues: Object.freeze([`none`, `slow`, `fast`]),
    allowNoArgument: true,
  },
  {
    name: LINEAR_FEATURE_NAMES.OVERFLOW_BLOCK,
    validValues: Object.freeze([`none`, `scroll`, `optional-paged`]),
  },
  {
    name: LINEAR_FEATURE_NAMES.OVERFLOW_INLINE,
    validValues: Object.freeze([`none`, `scroll`]),
  },
  {
    name: LINEAR_FEATURE_NAMES.COLOR_GAMUT,
    validValues: Object.freeze([`srgb`, `p3`, `rec2020`]),
  },
  {
    name: LINEAR_FEATURE_NAMES.DISPLAY_MODE,
    validValues: Object.freeze([
      `fullscreen`,
      `standalone`,
      `minimal-ui`,
      `browser`,
    ]),
  },
]

export const RANGED_FEATURES = [
  {
    name: RANGED_FEATURE_NAMES.WIDTH,
    validator: validateIsDimension,
    transformer: dimensionTransformer,
  },
  {
    name: RANGED_FEATURE_NAMES.HEIGHT,
    validator: validateIsDimension,
    transformer: dimensionTransformer,
  },
  {
    name: RANGED_FEATURE_NAMES.RESOLUTION,
    validator: validateIsResolution,
    transformer: resolutionTransformer,
  },
  {
    name: RANGED_FEATURE_NAMES.ASPECT_RATIO,
    validator: validateIsAspectRatio,
    transformer: identityTransformer,
  },
  {
    name: RANGED_FEATURE_NAMES.COLOR,
    validator: validateIsNonNegativeValidInteger,
    transformer: identityTransformer,
    featureConfig: {
      allowNoArgument: true,
    },
  },
  {
    name: RANGED_FEATURE_NAMES.COLOR_INDEX,
    validator: validateIsNonNegativeValidInteger,
    transformer: identityTransformer,
    featureConfig: {
      allowNoArgument: true,
    },
  },
  {
    name: RANGED_FEATURE_NAMES.MONOCHROME,
    validator: validateIsNonNegativeValidInteger,
    transformer: identityTransformer,
    featureConfig: {
      allowNoArgument: true,
    },
  },
]
