'use strict';

var styledComponents = require('styled-components');
var ramda = require('ramda');

var MEDIA_TYPES = Object.freeze({
  ALL: 'all',
  PRINT: 'print',
  SCREEN: 'screen',
  SPEECH: 'speech',
  NONE: ''
});

var UNITS = Object.freeze({
  EM: 'em',
  PX: 'px'
});

var breakpointsWereSupplied = ramda.both(ramda.complement(ramda.isEmpty), ramda.is(Object));
var breakpointValuesAreValid = ramda.compose(ramda.all(ramda.is(Number)), ramda.values);
var baseFontSizeIsValid = ramda.both(ramda.is(Number), ramda.gt(ramda.__, 0));
var defaultMediaTypeIsValid = ramda.contains(ramda.__, ramda.values(MEDIA_TYPES));
var unitIsValid = ramda.contains(ramda.__, ramda.values(UNITS));

var validateBreakpoints = function validateBreakpoints(breakpoints) {
  if (!breakpointsWereSupplied(breakpoints)) throw new Error("You must supply a breakpoint object with at least one breakpoint to 'configure()'");

  if (!breakpointValuesAreValid(breakpoints)) throw new Error('You must supply unitless values for each breakpoint but you supplied ' + ramda.values(breakpoints));
};

var validateConfig = function validateConfig(_ref) {
  var baseFontSize = _ref.baseFontSize,
      defaultMediaType = _ref.defaultMediaType,
      unit = _ref.unit,
      separateIfEms = _ref.separateIfEms;

  if (!baseFontSizeIsValid(baseFontSize)) throw new Error('baseFontSize must be a number, but you supplied \'' + baseFontSize + '\'');

  if (!defaultMediaTypeIsValid(defaultMediaType)) {
    throw new Error('\'defaultMediaType\' must be one of \'' + ramda.values(MEDIA_TYPES) + '\' but was \'' + defaultMediaType + '\'');
  }

  if (!unitIsValid(unit)) {
    throw new Error('\'unit\' must be one of \'' + ramda.values(MEDIA_TYPES) + '\' but was \'' + unit + '\'');
  }

  if (!ramda.is(Boolean)(separateIfEms)) {
    throw new Error('\'unit\' must be a boolean but was \'' + unit + '\'');
  }
};

// eslint-disable-next-line import/prefer-default-export
var appendUnit = function appendUnit(value, unit) {
  return "" + value + unit;
};

var taggedTemplateLiteral = function (strings, raw) {
  return Object.freeze(Object.defineProperties(strings, {
    raw: {
      value: Object.freeze(raw)
    }
  }));
};

var _templateObject = taggedTemplateLiteral(['\n    ', ' {\n      ', ';\n    }\n  '], ['\n    ', ' {\n      ', ';\n    }\n  ']);

var SEPARATOR_VALUE = 0.01;
var PREFIX = '@media';

var configure = function configure(breakpoints) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref$baseFontSize = _ref.baseFontSize,
      baseFontSize = _ref$baseFontSize === undefined ? 16 : _ref$baseFontSize,
      _ref$defaultMediaType = _ref.defaultMediaType,
      defaultMediaType = _ref$defaultMediaType === undefined ? MEDIA_TYPES.SCREEN : _ref$defaultMediaType,
      _ref$unit = _ref.unit,
      unit = _ref$unit === undefined ? UNITS.EM : _ref$unit,
      _ref$separateIfEms = _ref.separateIfEms,
      separateIfEms = _ref$separateIfEms === undefined ? true : _ref$separateIfEms;

  validateBreakpoints(breakpoints);
  validateConfig({
    baseFontSize: baseFontSize,
    defaultMediaType: defaultMediaType,
    unit: unit,
    separateIfEms: separateIfEms
  });

  // ---------------------------------------------------------------------------
  // UTILS
  // ---------------------------------------------------------------------------

  var pxToEm = function pxToEm(px) {
    return px / baseFontSize;
  };

  var toBreakpointArray = ramda.compose(ramda.map(ramda.zipObj(['name', 'value'])), ramda.toPairs);
  var orderByValue = ramda.compose(ramda.reverse, ramda.sort(ramda.prop('value')));

  var withUnit = function withUnit(value) {
    return appendUnit(unit === UNITS.EM ? pxToEm(value) : value, unit);
  };

  var breakpointsArray = orderByValue(toBreakpointArray(breakpoints));

  var getUpperLimit = function getUpperLimit(breakpoint) {
    var index = ramda.findIndex(ramda.propEq('name', breakpoint))(breakpointsArray);
    return ramda.compose(ramda.prop('name'), ramda.nth(index + 1))(breakpointsArray);
  };

  var missingBreakpointErrorMessage = function missingBreakpointErrorMessage(name) {
    return 'There is no breakpoint defined called \'' + name + '\', only: \'' + ramda.keys(breakpoints) + '\' are defined.';
  };

  var getBreakpoint = function getBreakpoint(name) {
    var value = breakpoints[name];
    if (!value) throw new Error(missingBreakpointErrorMessage(name));
    return value;
  };

  var buildQueryDefinition = function buildQueryDefinition() {
    for (var _len = arguments.length, elements = Array(_len), _key = 0; _key < _len; _key++) {
      elements[_key] = arguments[_key];
    }

    return PREFIX + ' ' + elements.join(' and ');
  };

  var buildQuery = function buildQuery(definition, content) {
    return styledComponents.css(_templateObject, definition, content);
  };

  // ---------------------------------------------------------------------------
  // API
  // ---------------------------------------------------------------------------

  var minWidth = function minWidth(breakpoint) {
    return '(min-width: ' + withUnit(getBreakpoint(breakpoint)) + ')';
  };

  var maxWidth = function maxWidth(breakpoint) {
    var breakpointValue = getBreakpoint(breakpoint);
    // If using ems, try and avoid any overlap in media queries by reducing the value of max-width queries so they don't run up against min-width queries.
    return '(max-width: ' + withUnit(unit === UNITS.EM && separateIfEms ? breakpointValue - SEPARATOR_VALUE : breakpointValue) + ')';
  };

  var aboveWidth = function aboveWidth(from) {
    var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : { mediaType: defaultMediaType };
    return function (stringParts) {
      for (var _len2 = arguments.length, interpolationValues = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        interpolationValues[_key2 - 1] = arguments[_key2];
      }

      return buildQuery(buildQueryDefinition(config.mediaType, minWidth(from)), styledComponents.css.apply(undefined, [stringParts].concat(interpolationValues)));
    };
  };

  var belowWidth = function belowWidth(to) {
    var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : { mediaType: defaultMediaType };
    return function (stringParts) {
      for (var _len3 = arguments.length, interpolationValues = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
        interpolationValues[_key3 - 1] = arguments[_key3];
      }

      return buildQuery(buildQueryDefinition(config.mediaType, maxWidth(to)), styledComponents.css.apply(undefined, [stringParts].concat(interpolationValues)));
    };
  };

  var betweenWidths = function betweenWidths(from, to) {
    var config = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : { mediaType: defaultMediaType };
    return function (stringParts) {
      for (var _len4 = arguments.length, interpolationValues = Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
        interpolationValues[_key4 - 1] = arguments[_key4];
      }

      return buildQuery(buildQueryDefinition(config.mediaType, minWidth(from), maxWidth(to)), styledComponents.css.apply(undefined, [stringParts].concat(interpolationValues)));
    };
  };

  var atWidthBreakpoint = function atWidthBreakpoint(breakpoint) {
    var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : { mediaType: defaultMediaType };
    return function (stringParts) {
      for (var _len5 = arguments.length, interpolationValues = Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {
        interpolationValues[_key5 - 1] = arguments[_key5];
      }

      var nextBreakpointWider = getUpperLimit(breakpoint);
      if (nextBreakpointWider) {
        return betweenWidths(breakpoint, nextBreakpointWider, config).apply(undefined, [stringParts].concat(interpolationValues));
      }
      return aboveWidth(breakpoint, config).apply(undefined, [stringParts].concat(interpolationValues));
    };
  };

  // ---------------------------------------------------------------------------
  // Export
  // ---------------------------------------------------------------------------

  return {
    aboveWidth: aboveWidth,
    belowWidth: belowWidth,
    betweenWidths: betweenWidths,
    atWidthBreakpoint: atWidthBreakpoint,
    minWidth: minWidth,
    maxWidth: maxWidth
  };
};

var mq$1 = {
  configure: configure
};

module.exports = mq$1;
