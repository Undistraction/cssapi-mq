import nodeResolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';

// Trasnpiled using Babel
export default {
  input: 'src/index.js',
  output: {
    file: 'lib/index.js',
    format: 'cjs', // Use Common JS Modules in transpiled code
  },
  plugins: [
    nodeResolve(),

    babel({
      exclude: 'node_modules/**', // only transpile project source
    }),

    commonjs({
      namedExports: {
        // left-hand side can be an absolute path, a path
        // relative to the current directory, or the name
        // of a module in node_modules
        'node_modules/is-plain-object/index.js': ['default'],
        'node_modules/react/index.js': ['Component', 'createElement'],
      },
    }),
  ],
};
