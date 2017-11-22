import { merge, mergeAll } from 'ramda';

import buildRangedFeature from '../features/buildRangedFeature';
import dimensionsOutput from '../output/dimensionsOutput';
import resolutionOutput from '../output/resolutionOutput';
import aspectRatioOutput from '../output/aspectRatioOutput';
import colorOutput from '../output/colorOutput';
import monochromeOutput from '../output/monochromeOutput';

export default (breakpoints, config) =>
  mergeAll([
    buildRangedFeature(
      'width',
      dimensionsOutput(config),
      breakpoints.width,
      config
    ),
    buildRangedFeature(
      'height',
      dimensionsOutput(config),
      breakpoints.height,
      config
    ),
    buildRangedFeature(
      'resolution',
      resolutionOutput(config),
      breakpoints.resolution,
      config
    ),
    buildRangedFeature(
      'aspect-ratio',
      aspectRatioOutput(config),
      breakpoints.aspectRatio,
      config
    ),
    buildRangedFeature(
      'color',
      colorOutput(config),
      breakpoints.color,
      merge(config, {
        allowNoArgument: true,
      })
    ),
    buildRangedFeature(
      'color-index',
      colorOutput(config),
      breakpoints.colorIndex,
      merge(config, {
        allowNoArgument: true,
      })
    ),
    buildRangedFeature(
      'monochrome',
      monochromeOutput(config),
      breakpoints.monochrome,
      merge(config, {
        allowNoArgument: true,
      })
    ),
  ]);
