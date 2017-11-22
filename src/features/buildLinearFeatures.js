import { mergeAll, map } from 'ramda';
import { LINEAR_FEATURES } from '../const';

import buildFeature from '../features/buildFeature';

const toLinearFeatures = map(({ name, validValues, allowNoArgument }) => ({
  [name]: buildFeature(name, validValues, allowNoArgument),
}));

export default () => mergeAll(toLinearFeatures(LINEAR_FEATURES));
