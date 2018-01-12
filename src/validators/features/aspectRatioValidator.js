import { isAspectRatioString } from 'cssjs-units';

export default {
  message:
    "You must supply an 'aspectRatio' in the form of two positive integers separated by a forward slash, for example '16/9'",
  validate: isAspectRatioString,
};
