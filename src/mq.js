import { css } from 'styled-components';

import { partial, mergeDeepLeft, merge, isEmpty } from 'ramda';

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
import {
  renderQueryDefinition,
  renderNotQueryDefinition,
} from './renderers/cssRenderers/queryRenderer';
import { throwError, queryNoElementsErrorMessage } from './errors';

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

  const query = (...elements) => {
    if (isEmpty(elements)) throwError(queryNoElementsErrorMessage);

    return (stringParts, ...interpolationValues) =>
      renderQuery(
        renderQueryDefinition(...elements),
        css(stringParts, ...interpolationValues)
      );
  };

  const not = (...elements) => ({
    not: renderNotQueryDefinition(
      configWithDefaults.defaultMediaType,
      ...elements
    ),
  });

  // ---------------------------------------------------------------------------
  // Export
  // ---------------------------------------------------------------------------

  const exports = {
    mediaType: buildMediaType(configWithDefaults.defaultMediaType),
    ...buildLinearFeatures(),
    ...buildRangeFeatures(breakpoints, configWithDefaults),
    query,
    not,
  };

  exports.tweak = partial(tweak, [exports]);
  return exports;
};

export default {
  configure,
};
