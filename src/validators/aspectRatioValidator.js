import { isRatioString } from '../utils/value';

export default {
  message:
    "You must supply an 'aspectRatio' in the form of two positive integers separated by a forward slash, for example '16/9'",
  validateExplicit: isRatioString,
};
