import { either } from 'ramda';

import { isPositiveIntegerOrZero, isNull } from '../../utils/predicates';

export default {
  message: "You must supply 'colorIndex' as zero or a positive integer",
  validate: either(isPositiveIntegerOrZero, isNull),
};
