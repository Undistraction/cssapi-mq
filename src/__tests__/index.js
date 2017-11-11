import 'jest-styled-components';
import './helpers/toEqualCSS';
import mq from '../index';

describe('aboveWidth', () => {
  it('returns the correct media query', () => {
    const expected = `
    @media screen and (min-width: 25em) {
      background-color: GhostWhite;
    }`;

    const result = mq.aboveWidth('small', 'background-color: GhostWhite;');
    expect(result).toEqualCSS(expected);
  });
});

describe('belowWidth', () => {
  it('returns the correct media query', () => {
    const expected = `@media screen and (max-width: 25em) {
    background-color: GhostWhite;
  }`;

    const result = mq.belowWidth('small', 'background-color: GhostWhite');
    expect(result).toEqualCSS(expected);
  });
});

describe('betweenWidths', () => {
  it('returns the correct media query', () => {
    const expected = `@media screen and (min-width: 25em) and (max-width: 56.25em) {
    background-color: GhostWhite;
  }`;

    const result = mq.betweenWidths(
      'small',
      'medium',
      'background-color: GhostWhite'
    );
    expect(result).toEqualCSS(expected);
  });
});

describe('atWidth', () => {
  it('returns the correct media query', () => {
    const expected = `@media screen and (min-width: 25em) and (max-width: 56.25em) {
    background-color: GhostWhite;
  }`;

    const result = mq.atBreakpoint(
      'small',
      `
      background-color: GhostWhite
    `
    );
    expect(result).toEqualCSS(expected);
  });
});
