import run from "@rollup/plugin-run";

export default {
  input: "src/index.js",
  output: {
    file: "dist/bundle.js",
    format: "iife",
  },
  plugins: [run()],
};
