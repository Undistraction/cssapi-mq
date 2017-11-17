import { mediaTypesAreValid, validateOrientation } from '../validations';
import { ensureArray, buildFeature } from '../utils';
import { throwError, invalidMediaTypeErrorMessage } from '../errors';

export const buildMediaType = defaultMediaType => (
  mediaTypes = [defaultMediaType]
) => {
  const mediaTypesArray = ensureArray(mediaTypes);
  if (!mediaTypesAreValid(mediaTypesArray))
    throwError(invalidMediaTypeErrorMessage(mediaTypesArray));
  return mediaTypesArray.join(', ');
};

export const buildOrientation = () => value => {
  validateOrientation(value);
  return buildFeature('orientation', value);
};
