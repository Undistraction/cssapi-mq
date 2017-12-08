import { either } from 'ramda';
import { isNull } from 'ramda-adjunct';

import { isPositiveIntegerOrZero } from '../../utils/predicates';

export default {
  message: "You must supply 'colorIndex' as zero or a positive integer",
  validate: either(isPositiveIntegerOrZero, isNull),
};
