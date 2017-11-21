export const MEDIA_PREFIX = '@media';

// -----------------------------------------------------------------------------
// CONFIG
// -----------------------------------------------------------------------------

export const SEPARATOR_VALUES = Object.freeze({
  rem: 0.01,
  em: 0.01,
  px: 1,
  dpi: 1,
});

export const DIMENSIONS_UNITS = Object.freeze({
  EM: 'em',
  REM: 'rem',
  PX: 'px',
});

export const UNITS = Object.freeze({
  DIMENSIONS: DIMENSIONS_UNITS,
  RESOLUTION: Object.freeze({ DPI: 'dpi' }),
});

export const BREAKPOINT_MAP_NAMES = Object.freeze([
  'width',
  'height',
  'resolution',
]);

// -----------------------------------------------------------------------------
// MEDIA TYPES
// -----------------------------------------------------------------------------

export const MEDIA_TYPES = Object.freeze({
  ALL: 'all',
  PRINT: 'print',
  SCREEN: 'screen',
  SPEECH: 'speech',
  NONE: '',
});

// -----------------------------------------------------------------------------
// MEDIA FEATURES
// -----------------------------------------------------------------------------

export const ORIENTATION = Object.freeze(['portrait', 'landscape']);
export const SCAN = Object.freeze(['interlace', 'progressive']);
export const GRID = Object.freeze([0, 1]);
export const UPDATE = Object.freeze(['none', 'slow', 'fast']);
export const OVERFLOW_BLOCK = Object.freeze([
  'none',
  'scroll',
  'optional-paged',
]);
export const OVERFLOW_INLINE = Object.freeze('none', 'scroll');
export const COLOR_GAMUR = Object.freeze('srgb', 'p3', 'rec2020');
export const DISPLAY_MODE = Object.freeze(
  'fullscreen',
  'standalone',
  'minimal-ui',
  'browser'
);

export const FEATURES = {
  orientation: ORIENTATION,
  scan: SCAN,
  grid: GRID,
  update: UPDATE,
  overflowBlock: OVERFLOW_BLOCK,
  overflowInline: OVERFLOW_INLINE,
  colorGamut: COLOR_GAMUR,
  displayMode: DISPLAY_MODE,
};
