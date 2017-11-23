import { either } from 'ramda';

import { isPositiveIntegerOrZero, isNull } from '../utils/value';

export default {
  message: "You must supply 'colorIndex' as a postive integer",
  validate: isPositiveIntegerOrZero,
  validateExplicit: either(isPositiveIntegerOrZero, isNull),
};
