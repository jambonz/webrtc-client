import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import json from '@rollup/plugin-json';
import css from 'rollup-plugin-lit-css';
import { terser } from "rollup-plugin-terser";
import nodePolyfills from 'rollup-plugin-node-polyfills';

export default {
  input: 'src/webrtc-widget/webrtc-widget.js',
  output: {
    file: './dist/webrtc-widget.js',
    format: 'esm',
    plugins: [terser()]
  },
  plugins: [
    nodeResolve(),
    commonjs(),
    css({ include: ['**/*.css', '**/*.scss'] }),
    json(),
    nodePolyfills({
      // This will create an empty tty module
      include: ['tty'],
      empty: ['tty']
    })
  ]
};