import camelcase from 'camelcase';
import runTests from './runTests';

const pluralise = value => `${value}s`;

export default (name, { tests = [] } = {}) => {
  describe(`${name}`, () => {
    describe('range queries', () => {
      const aboveMethod = camelcase('above', name);
      const belowMethod = camelcase('below', name);
      const betweenMethod = camelcase('between', pluralise(name));
      const atMethod = camelcase('at', name);
      const atBreakpointMethod = camelcase('at', name, 'Breakpoint');

      describe(`${aboveMethod}()`, () => {
        runTests(tests.above, name, aboveMethod);
      });

      describe(`${belowMethod}()`, () => {
        runTests(tests.below, name, belowMethod);
      });

      describe(`${betweenMethod}()`, () => {
        runTests(tests.between, name, betweenMethod);
      });

      describe(`${atMethod}()`, () => {
        runTests(tests.at, name, atMethod);
      });

      describe(`${atBreakpointMethod}()`, () => {
        runTests(tests.atBreakpoint, name, atBreakpointMethod);
      });
    });
  });
};
