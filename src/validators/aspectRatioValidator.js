import { isRatioString } from '../utils/value';

export default {
  message:
    "You must supply an 'aspectRatio' in the form {number}/{number}, for example '16/9'",
  validate: isRatioString,
  validateExplicit: isRatioString,
};
