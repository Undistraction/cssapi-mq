import { validateMediaTypes } from '../validations';
import { toCommaSeparatedList, ensureArray } from '../utils';

export default defaultMediaType => (mediaTypes = [defaultMediaType]) => {
  const mediaTypesArray = ensureArray(mediaTypes);
  validateMediaTypes(mediaTypesArray);
  return toCommaSeparatedList(mediaTypesArray);
};
