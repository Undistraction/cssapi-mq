import mq from '../index';
import 'jest-styled-components';
import Stylis from 'stylis';

import { css } from 'styled-components';

const stylis = new Stylis({
  global: false,
  cascade: true,
  keyframe: false,
  prefix: true,
  compress: false,
  semicolon: true,
});

const normalizeCSS = value => {
  if (Array.isArray(value)) value = value.join(` `);
  const flatCSS = value.replace(/^\s*\/\/.*$/gm, ''); // replace JS comments
  return stylis('', flatCSS);
};

describe('aboveWidth', () => {
  it('returns the correct media query', () => {
    const expected = `
      @media screen and (min-width: 25em) {
        background-color: GhostWhite;
      }`;

    const result = mq.aboveWidth(
      'small',
      `
      background-color: GhostWhite
    `
    );

    expect(normalizeCSS(result)).toEqual(normalizeCSS(expected));
  });
});
