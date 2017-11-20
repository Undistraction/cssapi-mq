// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

export const MEDIA_TYPES = Object.freeze({
  ALL: 'all',
  PRINT: 'print',
  SCREEN: 'screen',
  SPEECH: 'speech',
  NONE: '',
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

export const ORIENTATIONS = Object.freeze(['portrait', 'landscape']);

export const SEPARATOR_VALUES = Object.freeze({
  rem: 0.01,
  em: 0.01,
  px: 1,
  dpi: 1,
});

export const MEDIA_PREFIX = '@media';
