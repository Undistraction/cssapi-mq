import { either } from 'ramda';
import { isNumber, isPositiveNumberWithResolutionUnit } from '../utils/value';

export default {
  message: "You must supply 'resolution' as a positive number",
  validate: either(isNumber, isPositiveNumberWithResolutionUnit),
};
