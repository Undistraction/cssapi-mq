import { partial, mergeDeepLeft, merge, map, mergeAll, compose } from 'ramda';

import featureBuilder from './utils/featureBuilder';
import { buildMediaType, buildOrientation } from './utils/features';

import {
  validateBreakpointSets,
  validateConfig,
  validateBreakpoints,
} from './validations';

import { MEDIA_TYPES, UNITS, BREAKPOINT_MAP_NAMES } from './const';

const defaultConfig = {
  baseFontSize: 16,
  defaultMediaType: MEDIA_TYPES.SCREEN,
  unit: UNITS.EM,
  shouldSeparateQueries: true,
  errorIfNoBreakpointDefined: true,
};

const configure = (breakpoints, config) => {
  validateBreakpoints(breakpoints);
  validateBreakpointSets(breakpoints);
  const configWithDefaults = merge(defaultConfig, config);
  validateConfig(configWithDefaults);

  const renderFeatures = () =>
    compose(
      mergeAll,
      map(name => featureBuilder(name, breakpoints[name], configWithDefaults))
    )(BREAKPOINT_MAP_NAMES);

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
