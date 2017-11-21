import { isPositiveInteger } from '../utils/value';

export default {
  message: "You must supply 'colorIndex' as a postive integer",
  validate: value => isPositiveInteger(value),
};
