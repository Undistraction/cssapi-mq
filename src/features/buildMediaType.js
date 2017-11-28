import { validateMediaTypes } from '../validations';
import { toCommaSeparatedList } from '../utils/string';
import { ensureArray } from '../utils/array';

export default defaultMediaType => (mediaTypes = [defaultMediaType]) => {
  const mediaTypesArray = ensureArray(mediaTypes);
  validateMediaTypes(mediaTypesArray);
  return toCommaSeparatedList(mediaTypesArray);
};
