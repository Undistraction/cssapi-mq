import { isUndefined } from '../utils/value';
import { validateFeature } from '../validations';
import { renderFeature } from '../renderers/cssRenderers/queryRenderer';

export default (name, possibleValues, allowNoArgument = false) => value => {
  if (!(isUndefined(value) && allowNoArgument)) {
    validateFeature(name, value, possibleValues);
  }
  return renderFeature(name, value);
};
