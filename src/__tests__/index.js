import mq from '../index';
import Stylis from 'stylis';
import 'jest-styled-components';

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

describe('belowWidth', () => {
  it('returns the correct media query', () => {
    const expected = `
      @media screen and (max-width: 25em) {
        background-color: GhostWhite;
      }`;

    const result = mq.belowWidth(
      'small',
      `
      background-color: GhostWhite
    `
    );
    expect(normalizeCSS(result)).toEqual(normalizeCSS(expected));
  });
});

describe('betweenWidths', () => {
  it('returns the correct media query', () => {
    const expected = `
      @media screen and (min-width: 25em) and (max-width: 56.25em) {
        background-color: GhostWhite;
      }`;

    const result = mq.betweenWidths(
      'small',
      'medium',
      `
      background-color: GhostWhite
    `
    );
    expect(normalizeCSS(result)).toEqual(normalizeCSS(expected));
  });
});

describe('atWidth', () => {
  it('returns the correct media query', () => {
    const expected = `
      @media screen and (min-width: 25em) and (max-width: 56.25em) {
        background-color: GhostWhite;
      }`;

    const result = mq.atBreakpoint(
      'small',
      `
      background-color: GhostWhite
    `
    );
    expect(normalizeCSS(result)).toEqual(normalizeCSS(expected));
  });
});
