import { isNumber } from '../utils/value';

export default {
  message: "You must supply 'resolution' as a positive number",
  validate: isNumber,
};
