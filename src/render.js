import { css } from 'styled-components';
import { reject, compose, isNil, join } from 'ramda';
import { MEDIA_PREFIX } from './const';

const nameValue = compose(join(': '), reject(isNil));

export const renderFeature = (name, value) => `(${nameValue([name, value])})`;

export const renderQueryDefinition = (...elements) =>
  `${MEDIA_PREFIX} ${elements.join(' and ')}`;

export const renderQuery = (definition, content) => css`
  ${definition} {
    ${content};
  }
`;
