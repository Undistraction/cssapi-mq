import { validateFeature } from '../validations';
import { renderFeature } from '../render';

export default (name, possibleValues) => value => {
  validateFeature(name, value, possibleValues);
  return renderFeature(name, value);
};
