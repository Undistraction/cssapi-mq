import { either } from 'ramda';

import { isPositiveIntegerOrZero, isNull } from '../../utils/predicates';

export default {
  message: "You must supply 'monochrome' as zero or a postive integer",
  validate: either(isPositiveIntegerOrZero, isNull),
};
