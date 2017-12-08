import { unless, both, always, partial } from 'ramda';

import { isUndefined } from 'ramda-adjunct';
import { validateFeature } from '../validations';
import { renderFeature } from '../renderers/cssRenderers/queryRenderer';

export default (name, possibleValues, allowNoArgument = false) => value => {
  unless(
    both(isUndefined, always(allowNoArgument)),
    partial(validateFeature, [name, possibleValues])
  )(value);
  return renderFeature(name, value);
};
