import { when, complement } from 'ramda';

import { isArray } from './value';

// eslint-disable-next-line import/prefer-default-export
export const ensureArray = when(complement(isArray), mediaTypes => [
  mediaTypes,
]);
