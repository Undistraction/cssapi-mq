import { map, merge, mergeAll, curry } from 'ramda';
import camelcase from 'camelcase';
import { RANGED_FEATURES } from '../features';
import buildRangedFeature from './buildRangedFeature';

const build = (globalConfig, breakpoints, item) => {
  const x = buildRangedFeature(
    item.name,
    item.output(globalConfig),
    breakpoints[camelcase(item.name)],
    merge(globalConfig, item.config)
  );
  return x;
};

export default (breakpoints, globalConfig) => {
  const x = mergeAll(
    map(curry(build)(globalConfig, breakpoints))(RANGED_FEATURES)
  );
  return x;
};
