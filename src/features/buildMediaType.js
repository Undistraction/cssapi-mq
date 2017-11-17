import { mediaTypesAreValid } from '../validations';
import { ensureArray } from '../utils';
import { throwError, invalidMediaTypeErrorMessage } from '../errors';

export default defaultMediaType => (mediaTypes = [defaultMediaType]) => {
  const mediaTypesArray = ensureArray(mediaTypes);
  if (!mediaTypesAreValid(mediaTypesArray))
    throwError(invalidMediaTypeErrorMessage(mediaTypesArray));
  return mediaTypesArray.join(', ');
};
