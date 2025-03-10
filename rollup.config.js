import { terser } from "rollup-plugin-terser";

export default {
  input: 'client/index.js', // Change to your main JS file if needed
  output: {
    file: 'dist/bundle.js',
    format: 'iife',
  },
  plugins: [
    terser() // Optional: minify the output
  ]
};