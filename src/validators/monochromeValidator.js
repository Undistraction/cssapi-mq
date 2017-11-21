import { isPositiveInteger } from '../utils/value';

export default {
  message: "You must supply 'monochrome' as a postive integer",
  validate: isPositiveInteger,
};
