import { reject, concat, compose, isNil, join, when, map } from 'ramda';
import { isArray } from '../../utils/value';
import { MEDIA_PREFIX } from '../../const';

const nameValue = compose(join(': '), reject(isNil));

export const joinAnd = join(' and ');
export const joinComma = join(', ');
export const prefixWithNot = concat('not ');

export const renderFeature = (name, value) =>
  join('', ['(', nameValue([name, value]), ')']);

export const renderQueryDefinition = (...elements) => {
  elements = map(when(isArray, joinAnd))(elements);
  return join(' ', [MEDIA_PREFIX, elements]);
};

export const renderNotQueryDefinition = (...elements) =>
  compose(joinComma, map(compose(prefixWithNot, when(isArray, joinAnd))))(
    elements
  );
