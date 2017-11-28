import { either } from 'ramda';
import {
  isPositiveNumber,
  isPositiveNumberWithDimensionsUnit,
} from '../../utils/value';

export default {
  message:
    "You must supply a 'dimension' as either a unitless positive number or a string comprised of a number followed by em, rem px",
  validate: either(isPositiveNumber, isPositiveNumberWithDimensionsUnit),
};
