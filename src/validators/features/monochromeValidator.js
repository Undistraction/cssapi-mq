import { either } from 'ramda';
import { isNull } from 'ramda-adjunct';

import { isPositiveIntegerOrZero } from '../../utils/predicates';

export default {
  message: "You must supply 'monochrome' as zero or a postive integer",
  validate: either(isPositiveIntegerOrZero, isNull),
};
