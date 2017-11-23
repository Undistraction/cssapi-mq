import { mergeAll, map } from 'ramda';
import camelcase from 'camelcase';
import { LINEAR_FEATURES } from '../features';

import buildFeature from '../features/buildFeature';

const toLinearFeatures = map(({ name, validValues, allowNoArgument }) => ({
  [camelcase(name)]: buildFeature(name, validValues, allowNoArgument),
}));

export default () => mergeAll(toLinearFeatures(LINEAR_FEATURES));
