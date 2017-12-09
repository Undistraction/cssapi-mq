import { either } from 'ramda';
import { isValidNumber } from 'js-css-units';

import { isPositiveNumberWithResolutionUnit } from '../../utils/predicates';

export default {
  message: "You must supply 'resolution' as a positive number",
  validate: either(isValidNumber, isPositiveNumberWithResolutionUnit),
};
