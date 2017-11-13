import './helpers/toEqualCSS';
import styledMQ from '../mq';

// Register serializer for use by Jest in generating snapshots. Without a serializer the snapshots are difficult to read.
import cssSerialiser from './helpers/cssSerialiser';

expect.addSnapshotSerializer(cssSerialiser);

const validBreakpoints = {
  small: 400, // 0–400
  medium: 900, // 400–900
  large: 1100, // 900–1100
  xLarge: 1300, // 1100–1300
};

const validMQ = () => styledMQ.configure(validBreakpoints);

describe('api', () => {
  describe('configuration', () => {
    it('throws if no breakpoints are supplied', () => {
      expect(() => styledMQ.configure()).toThrow();
    });

    it('throws if invalid breakpoint value is supplied', () => {
      expect(() => styledMQ.configure({ small: 'xxx' })).toThrow();
    });

    it("doesn't throw an error with default configuration", () => {
      expect(() => validMQ.not.toThrow());
    });

    describe('config object', () => {
      it("adjusts values based on 'basefontSize'", () => {
        const result = styledMQ
          .configure(validBreakpoints, { baseFontSize: 10 })
          .belowWidth('small')`
        background-color: ${() => 'GhostWhite'};
      `;
        expect(result).toMatchSnapshot();
      });

      it("throws if 'baseFontSize' is not a positive number", () => {
        const config = { baseFontSize: 'xxxx' };
        expect(() => styledMQ.configure(validBreakpoints, config)).toThrow();
      });

      it("doesn't throw an error if 'baseFontSize' is a positive number", () => {
        const config = { baseFontSize: 12 };
        expect(() =>
          styledMQ.configure(validBreakpoints, config)
        ).not.toThrow();
      });

      it("throws if 'defaultMediaType' is not valid", () => {
        const config = { defaultMediaType: 'xxxx' };
        expect(() => styledMQ.configure(validBreakpoints, config)).toThrow();
      });

      it("doesn't throw an error if 'defaultMediaType' is valid", () => {
        expect(() =>
          styledMQ.configure(validBreakpoints, { defaultMediaType: 'all' })
        ).not.toThrow();
        // Special check for empty string
        expect(() =>
          styledMQ.configure(validBreakpoints, { defaultMediaType: '' })
        ).not.toThrow();
      });

      it("throws if 'unit' is not valid", () => {
        const config = { unit: 'xxxx' };
        expect(() => styledMQ.configure(validBreakpoints, config)).toThrow();
      });

      it("doesn't throw an error if 'unit' is valid", () => {
        const config = { unit: 'px' };
        expect(() =>
          styledMQ.configure(validBreakpoints, config)
        ).not.toThrow();
      });

      it("throws if 'separateIfEms' is not a boolean", () => {
        const config = { separateIfEms: 'xxxx' };
        expect(() => styledMQ.configure(validBreakpoints, config)).toThrow();
      });

      it("doesn't throw an error if 'separateIfEms' is a boolean", () => {
        const config = { separateIfEms: false };
        expect(() =>
          styledMQ.configure(validBreakpoints, config)
        ).not.toThrow();
      });
    });
  });

  // describe('minWidth')

  describe('aboveWidth', () => {
    it('returns the correct media query', () => {
      const result = validMQ().aboveWidth('small')`
        background-color: ${() => 'GhostWhite'};
      `;
      expect(result).toMatchSnapshot();
    });

    it("throws if breakpoint doesn't exist", () => {
      expect(() => validMQ().aboveWidth('xxxx')``).toThrow();
    });
  });

  describe('belowWidth', () => {
    it('returns the correct media query', () => {
      const result = validMQ().belowWidth('small')`
        background-color: ${() => 'GhostWhite'};
      `;
      expect(result).toMatchSnapshot();
    });

    it("throws if breakpoint doesn't exist", () => {
      expect(() => validMQ().belowWidth('xxxx')``).toThrow();
    });
  });

  describe('betweenWidths', () => {
    it('returns the correct media query', () => {
      const result = validMQ().betweenWidths('small', 'medium')`
        background-color: ${() => 'GhostWhite'};
      `;
      expect(result).toMatchSnapshot();
    });

    it('returns the correct media query with breakpoint order reversed', () => {
      const result = validMQ().betweenWidths('medium', 'small')`
        background-color: ${() => 'GhostWhite'};
      `;
      expect(result).toMatchSnapshot();
    });

    it("throws if 'from' breakpoint doesn't exist", () => {
      expect(() => validMQ().betweenWidths('xxxx', 'large')``).toThrow();
    });

    it("throws if 'to' breakpoint doesn't exist", () => {
      expect(() => validMQ().betweenWidths('large', 'xxxx')``).toThrow();
    });

    it("throws if 'from' and 'to' breakpoints are the samet", () => {
      expect(() => validMQ().betweenWidths('large', 'large')``).toThrow();
    });
  });

  describe('atBreakpointWidth', () => {
    it('returns the correct query when it is first breakpoint', () => {
      const result = validMQ().atWidth('small')`
        background-color: ${() => 'GhostWhite'};
      `;
      expect(result).toMatchSnapshot();
    });

    it('returns the correct query when it is last breakpoint', () => {
      const result = validMQ().atWidth('xLarge')`
        background-color: ${() => 'GhostWhite'};
      `;
      expect(result).toMatchSnapshot();
    });

    it('returns the correct query when it is between other breakpoints', () => {
      const result = validMQ().atWidth('large')`
        background-color: ${() => 'GhostWhite'};
      `;
      expect(result).toMatchSnapshot();
    });

    it("throws if breakpoint doesn't exist", () => {
      expect(() => validMQ().atWidth('xxxx')``).toThrow();
    });
  });
});
