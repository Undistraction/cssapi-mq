import { partial, mergeDeepLeft, merge, mergeAll, map } from 'ramda';

import buildRangedFeature from './features/buildRangedFeature';
import buildMediaType from './features/buildMediaType';
import buildFeature from './features/buildFeature';

import {
  validateBreakpointSets,
  validateConfig,
  validateBreakpoints,
} from './validations';

import dimensionsOutput from './output/dimensionsOutput';
import resolutionOutput from './output/resolutionOutput';
import aspectRatioOutput from './output/aspectRatioOutput';
import colorOutput from './output/colorOutput';
import monochromeOutput from './output/monochromeOutput';

import { MEDIA_TYPES, UNITS, LINEAR_FEATURES } from './const';

const defaultConfig = {
  baseFontSize: 16,
  defaultMediaType: MEDIA_TYPES.SCREEN,
  dimensionsUnit: UNITS.DIMENSIONS.EM,
  shouldSeparateQueries: true,
  onlyNamedBreakpoints: true,
};

const toLinearFeatures = map(({ name, validValues, allowNoArgument }) => {
  const o = {};
  o[name] = buildFeature(name, validValues, allowNoArgument);
  return o;
});

const configure = (breakpoints, config) => {
  const configWithDefaults = merge(defaultConfig, config);
  validateConfig(configWithDefaults);
  validateBreakpoints(breakpoints);
  validateBreakpointSets(breakpoints);

  const renderLinearFeatures = () =>
    mergeAll(toLinearFeatures(LINEAR_FEATURES));

  const renderRangeFeatures = () =>
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
      buildRangedFeature(
        'color',
        colorOutput(config),
        breakpoints.color,
        merge(configWithDefaults, { allowNoArgument: true })
      ),
      buildRangedFeature(
        'color-index',
        colorOutput(config),
        breakpoints.colorIndex,
        merge(configWithDefaults, { allowNoArgument: true })
      ),
      buildRangedFeature(
        'monochrome',
        monochromeOutput(config),
        breakpoints.monochrome,
        merge(configWithDefaults, { allowNoArgument: true })
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
    ...renderLinearFeatures(),
    ...renderRangeFeatures(),
  };

  exports.tweak = partial(tweak, [exports]);
  return exports;
};

export default {
  configure,
};
