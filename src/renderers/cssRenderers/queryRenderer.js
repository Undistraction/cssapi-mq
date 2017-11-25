import { reject, compose, isNil, join } from 'ramda';
import { MEDIA_PREFIX } from '../../const';

const nameValue = compose(join(': '), reject(isNil));

export const renderFeature = (name, value) =>
  join('', ['(', nameValue([name, value]), ')']);

export const renderQueryDefinition = (...elements) =>
  join(' ', [MEDIA_PREFIX, join(' and ', elements)]);
