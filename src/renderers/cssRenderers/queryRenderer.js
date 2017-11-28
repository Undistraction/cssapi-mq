import {
  __,
  reject,
  concat,
  compose,
  isNil,
  join,
  when,
  map,
  forEach,
  either,
  any,
  all,
  both,
  has,
  contains,
  complement,
  values,
} from 'ramda';
import { isArray, isString, isObject, isNull } from '../../utils/value';
import { MEDIA_PREFIX, MEDIA_TYPES } from '../../const';
import {
  throwError,
  queryNoNestedArraysErrorMessage,
  queryElementIsValidTypeErrorMessage,
  queryChildElementIsValidTypeErrorMessage,
} from '../../errors';

const nameValue = compose(join(': '), reject(isNil));
const isArrayOrString = either(isArray, isString);
const isNegationObject = both(isObject, has('not'));

export const joinAnd = join(' and ');
const joinComma = join(', ');
const prefixWithNot = concat('not ');
const containsArrays = any(isArray);
const expandNegationObject = negationObject => negationObject.not;
const containsMediaType = contains(__, values(MEDIA_TYPES));
const arrayContainsMediaType = any(containsMediaType);

export const ensureMediaType = (defaultMediaType, ...elements) =>
  map(element => {
    if (isArray(element)) {
      // Only add prefix if no media type is declared
      if (arrayContainsMediaType(element)) {
        return element;
      }
      return [defaultMediaType, ...element];
    }
    if (containsMediaType(element)) {
      return element;
    }
    return joinAnd([defaultMediaType, element]);
  })(elements);

const queryElementIsValidType = element => {
  if (
    either(isNull, complement(either(isArrayOrString, isNegationObject)))(
      element
    )
  )
    throwError(queryElementIsValidTypeErrorMessage(element));
};

const queryElementChildrenValidType = element => {
  if (isArray(element)) {
    if (
      !all(child => either(isArrayOrString, isNegationObject(child)))(element)
    ) {
      throwError(queryChildElementIsValidTypeErrorMessage(element));
    }
  }
};

const elemementHasNoNestedArrays = element => {
  if (isArray(element)) {
    if (any(containsArrays)(element)) {
      throwError(queryNoNestedArraysErrorMessage(element));
    }
  }
};

const validateDefinition = (...elements) => {
  forEach(element => {
    queryElementIsValidType(element);
    queryElementChildrenValidType(element);
    elemementHasNoNestedArrays(element);
  })(elements);
};

export const renderFeature = (name, value) =>
  join('', ['(', nameValue([name, value]), ')']);

export const renderQueryDefinition = (...elements) => {
  validateDefinition(...elements);
  elements = map(when(isNegationObject, expandNegationObject))(elements);
  elements = map(when(isArray, joinAnd))(elements);
  return join(' ', [MEDIA_PREFIX, elements]);
};

export const renderNotQueryDefinition = (defaultMediaType, ...elements) => {
  validateDefinition(...elements);
  elements = ensureMediaType(defaultMediaType, ...elements);

  return compose(
    joinComma,
    map(compose(prefixWithNot, when(isArray, joinAnd)))
  )(elements);
};
