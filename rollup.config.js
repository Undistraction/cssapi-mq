import nodeResolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';

export default {
  name: 'styledMQ',
  input: 'src/index.js',
  output: {
    file: 'dist/styled-mq.js',
    format: 'umd',
  },
  // Define modules that shouldn't be included in the build. It is assumed they
  // will be available via globals at runtime.
  external: ['react', 'styled-components', 'ramda'],
  // Define how external global modules should be referenced in the UMD bundle
  globals: { react: 'React', 'styled-components': 'styled', ramda: 'R' },
  plugins: [
    nodeResolve(),
    babel({
      babelrc: false,
      exclude: 'node_modules/**',
      presets: [
        [
          'env',
          {
            modules: false,
          },
        ],
      ],
      plugins: [
        'external-helpers',
        'transform-es2015-destructuring',
        'transform-object-rest-spread',
      ],
    }),
    // Allow CommonJS modules to be included in build.
    commonjs({
      // Styled components uses the following and we need to ignore them here.
      namedExports: {
        //'node_modules/is-plain-object/index.js': ['default'],
        //'node_modules/react/index.js': ['Component', 'createElement'],
      },
    }),
  ],
};
