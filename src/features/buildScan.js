import { validateScan } from '../validations';
import { renderFeature } from '../render';

export default () => value => {
  validateScan(value);
  return renderFeature('scan', value);
};
