import { either } from 'ramda';
import { isNumber, isNumberWithDimensionsUnit } from '../utils/value';

export default {
  message: 'You must supply a dimension as a unitless number',
  validate: isNumber,
  validateExplicit: either(isNumber, isNumberWithDimensionsUnit),
};
