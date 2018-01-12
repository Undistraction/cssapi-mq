import { either } from 'ramda';
import { isValidPositiveNumber } from 'cssjs-units';

import { isPositiveNumberWithDimensionsUnit } from '../../utils/predicates';

export default {
  message:
    "You must supply a 'dimension' as either a unitless positive number or a string comprised of a number followed by em, rem px",
  validate: either(isValidPositiveNumber, isPositiveNumberWithDimensionsUnit),
};
