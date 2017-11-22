import { either } from 'ramda';
import { isNumber, isNumberWithResolutionUnit } from '../utils/value';

export default {
  message: "You must supply 'resolution' as a positive number",
  validate: isNumber,
  validateExplicit: either(isNumber, isNumberWithResolutionUnit),
};
