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
  values,
  unless,
} from 'ramda';
import { isArray, isString, isObject, isNull } from '../../utils/predicates';
import { MEDIA_PREFIX, MEDIA_TYPES } from '../../const';
import {
  composeError,
  queryNoNestedArraysErrorMessage,
  queryElementIsValidTypeErrorMessage,
  queryChildElementIsValidTypeErrorMessage,
} from '../../errors';
import { neither } from '../../utils/logic';

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
  when(
    either(isNull, neither(isArrayOrString, isNegationObject)),
    composeError(queryElementIsValidTypeErrorMessage)
  )(element);
};

const queryElementChildrenValidType = element => {
  when(
    isArray,
    unless(
      all(child => either(isArrayOrString, isNegationObject)(child)),
      composeError(queryChildElementIsValidTypeErrorMessage)
    )
  )(element);
};

const elemementHasNoNestedArrays = element => {
  when(
    isArray,
    when(any(containsArrays), composeError(queryNoNestedArraysErrorMessage))
  )(element);
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
