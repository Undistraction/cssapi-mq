import nodeResolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';

export default {
  name: 'styledMQ',
  input: 'src/index.js',
  output: {
    file: 'dist/styled-mq.js',
    format: 'umd', // Use Common JS Modules in transpiled code
  },

  external: ['ramda', 'styled-components'],
  plugins: [
    nodeResolve(),
    babel({
      exclude: 'node_modules/**',
    }),
    commonjs({
      namedExports: {
        'node_modules/is-plain-object/index.js': ['default'],
        'node_modules/react/index.js': ['Component', 'createElement'],
      },
    }),
  ],
  globals: { react: 'React', 'styled-components': 'styled', ramda: 'R' },
};
