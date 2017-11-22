import camelcase from 'camelcase';
import runTests from './runTests';

const pluralise = value => `${value}s`;

export default (name, { perMethodTests = [] } = {}) => {
  describe(`${name}`, () => {
    describe('range queries', () => {
      const aboveMethod = camelcase('above', name);
      const belowMethod = camelcase('below', name);
      const betweenMethod = camelcase('between', pluralise(name));
      const atMethod = camelcase('at', name);
      const atBreakpointMethod = camelcase('at', name, 'Breakpoint');

      describe(`${aboveMethod}()`, () => {
        runTests(perMethodTests.above, name, aboveMethod);
      });

      describe(`${belowMethod}()`, () => {
        runTests(perMethodTests.below, name, belowMethod);
      });

      describe(`${betweenMethod}()`, () => {
        runTests(perMethodTests.between, name, betweenMethod);
      });

      describe(`${atMethod}()`, () => {
        runTests(perMethodTests.at, name, atMethod);
      });

      describe(`${atBreakpointMethod}()`, () => {
        runTests(perMethodTests.atBreakpoint, name, atBreakpointMethod);
      });
    });
  });
};
