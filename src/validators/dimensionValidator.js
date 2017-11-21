import { isNumber } from '../utils/value';

export default {
  message: 'You must supply a dimension as a unitless number',
  validate: isNumber,
};
