import {
  mqWithValidBreakpointsForRange,
  booleanValues,
  genericNumbers,
} from './data';
import cssSerialiser from './helpers/cssSerialiser';

expect.addSnapshotSerializer(cssSerialiser);

describe('query', () => {
  it('throws with no arguments', () => {
    const mq = mqWithValidBreakpointsForRange('width');
    const { query } = mq;
    expect(
      () =>
        query()`
        background-color: ${() => 'GhostWhite'};
      `
    ).toThrowErrorMatchingSnapshot();
  });

  const invalidValues = [
    ...booleanValues,
    ...genericNumbers,
    null,
    undefined,
    NaN,
    {},
  ];
  for (const value of invalidValues) {
    it(`throws with invalid argument ${value}`, () => {
      const mq = mqWithValidBreakpointsForRange('width');
      const { query } = mq;
      expect(
        () =>
          query(value)`
          background-color: ${() => 'GhostWhite'};
        `
      ).toThrowErrorMatchingSnapshot();
    });
  }

  it('renders query with single feature', () => {
    // @media (min-width: 25em) {
    const mq = mqWithValidBreakpointsForRange('width');
    const { query, minWidth } = mq;
    expect(
      query(minWidth('small'))`
        background-color: ${() => 'GhostWhite'};
      `
    ).toMatchSnapshot();
  });

  describe('and', () => {
    // @media (min-width: 25em) and (orientation: landscape) {
    it('renders query with two features anded together', () => {
      const mq = mqWithValidBreakpointsForRange('width');
      const { query, minWidth, orientation } = mq;
      expect(
        query([minWidth('small'), orientation('landscape')])`
            background-color: ${() => 'GhostWhite'};
          `
      ).toMatchSnapshot();
    });

    it('renders query with multiple features anded together', () => {
      // @media screen and (min-width: 25em) and (orientation: landscape) and (grid) {
      const mq = mqWithValidBreakpointsForRange('width');
      const { query, mediaType, grid, minWidth, orientation } = mq;
      expect(
        query([
          mediaType('screen'),
          minWidth('small'),
          orientation('landscape'),
          grid(),
        ])`
            background-color: ${() => 'GhostWhite'};
          `
      ).toMatchSnapshot();
    });
  });

  describe('or', () => {
    it('renders query with two features ored together', () => {
      // @media (min-width: 25em),(orientation: landscape) {
      const mq = mqWithValidBreakpointsForRange('width');
      const { query, minWidth, orientation } = mq;
      expect(
        query(minWidth('small'), orientation('landscape'))`
            background-color: ${() => 'GhostWhite'};
          `
      ).toMatchSnapshot();
    });

    it('renders query with multiple features ored together', () => {
      // @media screen,(min-width: 25em),(orientation: landscape),(grid) {
      const mq = mqWithValidBreakpointsForRange('width');
      const { query, minWidth, orientation, mediaType, grid } = mq;
      expect(
        query(
          mediaType('screen'),
          minWidth('small'),
          orientation('landscape'),
          grid()
        )`
            background-color: ${() => 'GhostWhite'};
          `
      ).toMatchSnapshot();
    });
  });

  describe('not', () => {
    it('negates anded queries', () => {
      // @media not screen and (color) and (orientation: landscape) {
      const mq = mqWithValidBreakpointsForRange('width');
      const { mediaType, query, not, color, orientation } = mq;
      expect(
        query(not([mediaType(), color(), orientation('landscape')]))`
            background-color: ${() => 'GhostWhite'};
          `
      ).toMatchSnapshot();
    });

    it('negates ored queries', () => {
      // @media not screen, not (color), not (orientation: landscape) {
      const mq = mqWithValidBreakpointsForRange('width');
      const { mediaType, query, not, color, orientation } = mq;
      expect(
        query(not(mediaType(), color(), orientation('landscape')))`
            background-color: ${() => 'GhostWhite'};
          `
      ).toMatchSnapshot();
    });
  });

  describe('mixed', () => {
    it('allows mixed queries (both and and or)', () => {
      // @media  screen, (color), screen and (color) and (orientation: landscape) {
      const mq = mqWithValidBreakpointsForRange('width');
      const { mediaType, query, color, orientation } = mq;
      expect(
        query(mediaType(), color(), [mediaType(), orientation('landscape')])`
              background-color: ${() => 'GhostWhite'};
            `
      ).toMatchSnapshot();
    });

    it('allows mixed not queries (both and and or)', () => {
      // @media not screen, not (color), not screen and (color) and (orientation: landscape) {
      const mq = mqWithValidBreakpointsForRange('width');
      const { mediaType, query, not, color, orientation } = mq;
      expect(
        query(
          not(mediaType(), color(), [mediaType(), orientation('landscape')])
        )`
              background-color: ${() => 'GhostWhite'};
            `
      ).toMatchSnapshot();
    });

    it('allows mixed queries and not queries (both and and or)', () => {
      // @media not screen, not (color), not screen and (color) and (orientation: landscape) {
      const mq = mqWithValidBreakpointsForRange('width');
      const { mediaType, grid, atWidth, query, not, color, orientation } = mq;
      expect(
        query(
          mediaType(),
          color(),
          [mediaType(), orientation('landscape')],
          not(grid(), [atWidth('large'), orientation('portrait')])
        )`
              background-color: ${() => 'GhostWhite'};
            `
      ).toMatchSnapshot();
    });
  });
});
