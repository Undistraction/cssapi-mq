import toCSS from './toCSS';

expect.extend({
  toEqualCSS(received, argument) {
    const pass = toCSS(received) === toCSS(argument);
    if (pass) {
      return {
        message: () => `expected ${received} to be ${argument}`,
        pass: true,
      };
    }
    return {
      message: () => `expected ${received} not to be ${argument}`,
      pass: false,
    };
  },
});
