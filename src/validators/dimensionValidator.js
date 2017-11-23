import { either } from 'ramda';
import {
  isPositiveNumber,
  isPositiveNumberWithDimensionsUnit,
} from '../utils/value';

export default {
  message:
    'You must supply a dimension as either a unitless number of an em, rem or pixel number',
  validate: isPositiveNumber,
  validateExplicit: either(
    isPositiveNumber,
    isPositiveNumberWithDimensionsUnit
  ),
};
