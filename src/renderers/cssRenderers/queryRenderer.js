import {
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
  complement,
} from 'ramda';
import { isArray, isString, isObject, isNull } from '../../utils/value';
import { MEDIA_PREFIX } from '../../const';
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
export const joinComma = join(', ');
export const prefixWithNot = concat('not ');
export const containsArrays = any(isArray);
export const expandNegationObject = negationObject => negationObject.not;

export const ensureMediaType = (defaultMediaType, ...elements) =>
  map(element => {
    if (isArray(element)) {
      return [defaultMediaType, ...element];
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
