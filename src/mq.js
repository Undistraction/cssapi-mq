import { css } from 'styled-components';

import { partial, mergeDeepLeft, merge } from 'ramda';

import buildMediaType from './features/buildMediaType';
import buildLinearFeatures from './features/buildLinearFeatures';
import buildRangeFeatures from './features/buildRangedFeatures';

import {
  validateBreakpointSets,
  validateConfig,
  validateBreakpoints,
} from './validations';

import { isNumberWithDimensionsUnit } from './utils/value';
import { unitedDimensionToUnitlessPixelValue } from './utils/units';
import { MEDIA_TYPES, UNITS } from './const';
import renderQuery from './renderers/cssRenderers/styledComponentsRenderer';
import { renderQueryDefinition } from './renderers/cssRenderers/queryRenderer';

const defaultConfig = {
  baseFontSize: 16,
  defaultMediaType: MEDIA_TYPES.SCREEN,
  dimensionsUnit: UNITS.DIMENSIONS.EM,
  shouldSeparateQueries: true,
  onlyNamedBreakpoints: true,
};

const validateConfigArgs = (breakpoints, config) => {
  validateConfig(config);
  validateBreakpoints(breakpoints);
  validateBreakpointSets(breakpoints);
};

const configure = (breakpoints, config = {}) => {
  // Don't expand config vars as we need to pass a single config object around.
  const configWithDefaults = merge(defaultConfig, config);
  validateConfigArgs(breakpoints, configWithDefaults);
  // Ensure we have a unitless value stored for baseFontSize
  if (isNumberWithDimensionsUnit(configWithDefaults.baseFontSize)) {
    configWithDefaults.baseFontSize = unitedDimensionToUnitlessPixelValue(
      configWithDefaults.baseFontSize,
      16
    );
  }
  // ---------------------------------------------------------------------------
  // API
  // ---------------------------------------------------------------------------

  const tweak = (mq, tweakpoints) => {
    validateBreakpoints(tweakpoints);
    validateBreakpointSets(tweakpoints);
    const mergedBreakpoints = mergeDeepLeft(breakpoints, tweakpoints);
    mq.tweaked = configure(mergedBreakpoints, configWithDefaults);
    return mq;
  };

  const query = (...elements) => (stringParts, ...interpolationValues) => {
    // console.log('QUERY_________________');
    // console.log('Elements:', elements);
    // console.log('CSS:', stringParts, interpolationValues);
    return renderQuery(
      renderQueryDefinition(...elements),
      css(stringParts, ...interpolationValues)
    );
  };

  // ---------------------------------------------------------------------------
  // Export
  // ---------------------------------------------------------------------------

  const exports = {
    mediaType: buildMediaType(configWithDefaults.defaultMediaType),
    ...buildLinearFeatures(),
    ...buildRangeFeatures(breakpoints, configWithDefaults),
    query,
  };

  exports.tweak = partial(tweak, [exports]);
  return exports;
};

export default {
  configure,
};
