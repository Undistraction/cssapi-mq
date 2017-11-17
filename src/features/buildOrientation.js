import { validateOrientation } from '../validations';
import { renderFeature } from '../render';

export default () => value => {
  validateOrientation(value);
  return renderFeature('orientation', value);
};
