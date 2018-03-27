import camelcase from 'camelcase'

export const MEDIA_PREFIX = `@media`

// -----------------------------------------------------------------------------
// FEATURE NAMES
// -----------------------------------------------------------------------------

export const RANGED_FEATURE_NAMES = Object.freeze({
  WIDTH: `width`,
  HEIGHT: `height`,
  RESOLUTION: `resolution`,
  ASPECT_RATIO: `aspect-ratio`,
  COLOR: `color`,
  COLOR_INDEX: `color-index`,
  MONOCHROME: `monochrome`,
})

export const LINEAR_FEATURE_NAMES = Object.freeze({
  ORIENTATION: `orientation`,
  SCAN: `scan`,
  GRID: `grid`,
  UPDATE: `update`,
  OVERFLOW_BLOCK: `overflow-block`,
  OVERFLOW_INLINE: `overflow-inline`,
  COLOR_GAMUT: `color-gamut`,
  DISPLAY_MODE: `display-mode`,
})

// -----------------------------------------------------------------------------
// CONFIG
// -----------------------------------------------------------------------------

export const SEPARATOR_VALUES = Object.freeze({
  rem: 0.01,
  em: 0.01,
  px: 1,
  dpi: 1,
})

export const DIMENSIONS_UNITS = Object.freeze({
  EM: `em`,
  REM: `rem`,
  PX: `px`,
})

export const RESOLUTION_UNIT = `dpi`

export const UNITS = Object.freeze({
  DIMENSIONS: DIMENSIONS_UNITS,
  RESOLUTION: Object.freeze({ DPI: `dpi` }),
})

export const BREAKPOINT_MAP_NAMES = Object.freeze([
  `width`,
  `height`,
  `resolution`,
  `aspectRatio`,
  `color`,
  `colorIndex`,
  `monochrome`,
])

// -----------------------------------------------------------------------------
// MEDIA TYPES
// -----------------------------------------------------------------------------

export const MEDIA_TYPES = Object.freeze({
  ALL: `all`,
  PRINT: `print`,
  SCREEN: `screen`,
  SPEECH: `speech`,
})

export const ERROR_PREFIX = `[cssapi-mq]`
export const CONFIGURE_PREFIX = `configure()`
export const TWEAK_PREFIX = `tweak()`
export const UNTWEAKED_PREFIX = `untweaked()`
export const API_MEDIA_TYPE_PREFIX = `mediaType()`
export const NOT_PREFIX = `not()`
export const QUERY_PREFIX = `query()`

export const functionPrefix = name => `${camelcase(name)}()`
