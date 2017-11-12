import './helpers/toEqualCSS';
import mq from '../mq';

// Register serializer for use by Jest in generating snapshots. Without a serializer the snapshots are difficult to read.
import cssSerialiser from './helpers/cssSerialiser';

expect.addSnapshotSerializer(cssSerialiser);

const validBreakpoints = {
  small: 400, // 0–400
  medium: 900, // 400–900
  large: 1100, // 900–1100
  xLarge: 1300, // 1100–1300
};

const validMQ = () => mq.configure(validBreakpoints);

describe('api', () => {
  describe('configuration', () => {
    it('throws an error if no breakpoints are supplied', () => {
      expect(() => mq.configure()).toThrow();
    });

    it('throws an error if invalid breakpoint value is supplied', () => {
      expect(() => mq.configure({ small: 'xxx' })).toThrow();
    });

    it("doesn't throw an error with default configuration", () => {
      expect(() => mq.configure({ small: 400 })).not.toThrow();
    });

    describe('config object', () => {
      it("adjusts values based on 'basefontSize'", () => {
        const result = mq
          .configure(validBreakpoints, { baseFontSize: 10 })
          .belowWidth('small')`
        background-color: ${() => 'GhostWhite'};
      `;
        expect(result).toMatchSnapshot();
      });

      it("throws an error if 'baseFontSize' is not a positive number", () => {
        const config = { baseFontSize: 'xxxx' };
        expect(() => mq.configure(validBreakpoints, config)).toThrow();
      });

      it("doesn't throw an error if 'baseFontSize' is a positive number", () => {
        const config = { baseFontSize: 12 };
        expect(() => mq.configure(validBreakpoints, config)).not.toThrow();
      });

      it("throws an error if 'defaultMediaType' is not valid", () => {
        const config = { defaultMediaType: 'xxxx' };
        expect(() => mq.configure(validBreakpoints, config)).toThrow();
      });

      it("doesn't throw an error if 'defaultMediaType' is valid", () => {
        expect(() =>
          mq.configure(validBreakpoints, { defaultMediaType: 'all' })
        ).not.toThrow();
        // Special check for empty string
        expect(() =>
          mq.configure(validBreakpoints, { defaultMediaType: '' })
        ).not.toThrow();
      });

      it("throws an error if 'unit' is not valid", () => {
        const config = { unit: 'xxxx' };
        expect(() => mq.configure(validBreakpoints, config)).toThrow();
      });

      it("doesn't throw an error if 'unit' is valid", () => {
        const config = { unit: 'px' };
        expect(() => mq.configure(validBreakpoints, config)).not.toThrow();
      });

      it("throws an error if 'separateIfEms' is not a boolean", () => {
        const config = { separateIfEms: 'xxxx' };
        expect(() => mq.configure(validBreakpoints, config)).toThrow();
      });

      it("doesn't throw an error if 'separateIfEms' is a boolean", () => {
        const config = { separateIfEms: false };
        expect(() => mq.configure(validBreakpoints, config)).not.toThrow();
      });
    });
  });

  describe('aboveWidth', () => {
    it('returns the correct media query', () => {
      const result = validMQ().aboveWidth('small')`
        background-color: ${() => 'GhostWhite'};
      `;
      expect(result).toMatchSnapshot();
    });
  });

  describe('belowWidth', () => {
    it('returns the correct media query', () => {
      const result = validMQ().belowWidth('small')`
        background-color: ${() => 'GhostWhite'};
      `;
      expect(result).toMatchSnapshot();
    });
  });

  describe('betweenWidths', () => {
    it('returns the correct media query', () => {
      const result = validMQ().betweenWidths('small', 'medium')`
        background-color: ${() => 'GhostWhite'};
      `;
      expect(result).toMatchSnapshot();
    });
  });

  describe('atWidth', () => {
    it('returns the correct media query', () => {
      const result = validMQ().atBreakpoint('small')`
        background-color: ${() => 'GhostWhite'};
      `;
      expect(result).toMatchSnapshot();
    });
  });
});
// eslint-disable-next-line import/prefer-default-export
export const appendUnit = (value, unit) => `${value}${unit}`;
