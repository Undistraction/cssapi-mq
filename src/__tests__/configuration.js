import styledMQ from '../mq';
import cssSerialiser from './helpers/cssSerialiser';
import {
  mqWithValidBreakpointsForRange,
  validBreakpointsForRange,
} from './data';

expect.addSnapshotSerializer(cssSerialiser);

describe('configure()', () => {
  it('throws if no breakpoints are supplied', () => {
    expect(() => styledMQ.configure()).toThrowErrorMatchingSnapshot();
  });

  it('throws if no breakpoint sets are supplied', () => {
    expect(() => styledMQ.configure({})).toThrowErrorMatchingSnapshot();
  });

  it('throws if invalid breakpoint set value is supplied', () => {
    expect(() =>
      styledMQ.configure({ width: { small: 'xxx' } })
    ).toThrowErrorMatchingSnapshot();
  });

  it("doesn't throw with default configuration", () => {
    expect(() => mqWithValidBreakpointsForRange('width').not.toThrow());
  });

  describe('config object', () => {
    describe('baseFontSize', () => {
      it("adjusts values based on 'basefontSize' for width", () => {
        const result = mqWithValidBreakpointsForRange('width', {
          baseFontSize: 10,
        }).belowWidth('small')`
          background-color: ${() => 'GhostWhite'};
        `;
        expect(result).toMatchSnapshot();
      });

      it("adjusts values based on 'basefontSize' for height", () => {
        const result = mqWithValidBreakpointsForRange('height', {
          baseFontSize: 10,
        }).belowHeight('small')`
          background-color: ${() => 'GhostWhite'};
        `;
        expect(result).toMatchSnapshot();
      });

      const invalidBaseFontSizes = [
        '',
        true,
        false,
        null,
        undefined,
        -20,
        'xxxx',
      ];

      for (const value of invalidBaseFontSizes) {
        it(`throws if 'baseFontSize' is not a positive number '${
          value
        }'`, () => {
          expect(() =>
            styledMQ.configure(validBreakpointsForRange('width'), {
              baseFontSize: value,
            })
          ).toThrowErrorMatchingSnapshot();
        });
      }

      const validBaseFontSizes = [1, 33.4, 150];

      for (const value of validBaseFontSizes) {
        it(`doesn't throw an error if 'baseFontSize' is '${value}'`, () => {
          expect(() =>
            styledMQ.configure(validBreakpointsForRange('width'), {
              baseFontSize: value,
            })
          ).not.toThrow();
        });
      }
    });

    describe('defaultMediaType', () => {
      const invalidDefaultMediaTypes = [
        '',
        true,
        false,
        undefined,
        'xxxx',
        444,
        {},
        [],
      ];
      for (const value of invalidDefaultMediaTypes) {
        it(`throws if 'defaultMediaType' is '${value}'`, () => {
          expect(() =>
            styledMQ.configure(validBreakpointsForRange('width'), {
              defaultMediaType: value,
            })
          ).toThrowErrorMatchingSnapshot();
        });
      }

      const validDefaultMediaTypes = ['screen', 'print', 'all', 'speech', null];
      for (const value of validDefaultMediaTypes) {
        it(`doesn't throw an error if 'defaultMediaType' is '${value}'`, () => {
          expect(() =>
            styledMQ.configure(validBreakpointsForRange('width'), {
              defaultMediaType: 'all',
            })
          ).not.toThrow();
        });
      }
    });

    describe('dimensionsUnit', () => {
      const invalidDimensionsUnits = [
        '',
        true,
        false,
        null,
        undefined,
        'xxxx',
        444,
        {},
        [],
      ];
      for (const value of invalidDimensionsUnits) {
        it(`throws if 'dimensionsUnit' is '${value}'`, () => {
          const config = { dimensionsUnit: value };
          expect(() =>
            styledMQ.configure(validBreakpointsForRange('width'), config)
          ).toThrowErrorMatchingSnapshot();
        });
      }

      const validDimensionsUnits = ['em', 'rem', 'px'];
      for (const value of validDimensionsUnits) {
        it(`doesn't throw an error if 'dimensionsUnit' is '${value}'`, () => {
          const config = { dimensionsUnit: value };
          expect(() =>
            styledMQ.configure(validBreakpointsForRange('width'), config)
          ).not.toThrow();
        });
      }
    });

    describe('shouldSeparateQueries', () => {
      const invalidShouldSeparateQueriesValues = [
        '',
        null,
        undefined,
        'xxxx',
        444,
        {},
        [],
      ];

      for (const value of invalidShouldSeparateQueriesValues) {
        it(`throws if 'shouldSeparateQueries' is '${value}'`, () => {
          const config = { shouldSeparateQueries: value };
          expect(() =>
            styledMQ.configure(validBreakpointsForRange('width'), config)
          ).toThrowErrorMatchingSnapshot();
        });
      }

      const validShouldSeparateQueriesValues = [true, false];
      for (const value of validShouldSeparateQueriesValues) {
        it(`doesn't throw an error if 'shouldSeparateQueries' is a '${
          value
        }'`, () => {
          const config = { shouldSeparateQueries: value };
          expect(() =>
            styledMQ.configure(validBreakpointsForRange('width'), config)
          ).not.toThrow();
        });
      }
    });
  });
});
