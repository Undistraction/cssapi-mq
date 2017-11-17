import { validateOrientation } from '../validations';
import { buildFeature } from '../utils';

export default () => value => {
  validateOrientation(value);
  return buildFeature('orientation', value);
};
