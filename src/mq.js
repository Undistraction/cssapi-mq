import { partial, mergeDeepLeft, merge, mergeAll } from 'ramda';

import buildRangedFeature from './features/buildRangedFeature';
import buildMediaType from './features/buildMediaType';
import buildOrientation from './features/buildOrientation';

import {
  validateBreakpointSets,
  validateConfig,
  validateBreakpoints,
} from './validations';

import dimensionsOutput from './output/dimensionsOutput';
import resolutionOutput from './output/resolutionOutput';
import aspectRatioOutput from './output/aspectRatioOutput';

import { MEDIA_TYPES, UNITS } from './const';

const defaultConfig = {
  baseFontSize: 16,
  defaultMediaType: MEDIA_TYPES.SCREEN,
  dimensionsUnit: UNITS.DIMENSIONS.EM,
  shouldSeparateQueries: true,
  errorIfNoBreakpointDefined: true,
};

const configure = (breakpoints, config) => {
  validateBreakpoints(breakpoints);
  validateBreakpointSets(breakpoints);
  const configWithDefaults = merge(defaultConfig, config);
  validateConfig(configWithDefaults);
  const renderFeatures = () =>
    mergeAll([
      buildRangedFeature(
        'width',
        dimensionsOutput(config),
        breakpoints.width,
        configWithDefaults
      ),
      buildRangedFeature(
        'height',
        dimensionsOutput(config),
        breakpoints.height,
        configWithDefaults
      ),
      buildRangedFeature(
        'resolution',
        resolutionOutput(config),
        breakpoints.resolution,
        configWithDefaults
      ),
      buildRangedFeature(
        'aspect-ratio',
        aspectRatioOutput(config),
        breakpoints.aspectRatio,
        configWithDefaults
      ),
    ]);

  // ---------------------------------------------------------------------------
  // API
  // ---------------------------------------------------------------------------

  // Tweak
  // ---------------------------------------------------------------------------

  const tweak = (mq, tweakpoints) => {
    validateBreakpoints(tweakpoints);
    validateBreakpointSets(tweakpoints);
    const mergedBreakpoints = mergeDeepLeft(breakpoints, tweakpoints);
    mq.tweaked = configure(mergedBreakpoints, configWithDefaults);
    return mq;
  };

  // Media Query Features
  // ---------------------------------------------------------------------------

  // ---------------------------------------------------------------------------
  // Export
  // ---------------------------------------------------------------------------

  const exports = {
    mediaType: buildMediaType(configWithDefaults.defaultMediaType),
    orientation: buildOrientation(),
    ...renderFeatures(),
  };

  exports.tweak = partial(tweak, [exports]);
  return exports;
};

export default {
  configure,
};
