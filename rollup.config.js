import typescript from "@rollup/plugin-typescript";
import filesize from "rollup-plugin-filesize";

export default {
  input: "src/index.ts",
  output: {
    dir: "dist",
    sourcemap: true,
    format: "esm",
  },
  plugins: [
    typescript({
      tsconfig: "./tsconfig.json",
      strict: true,
      noEmitOnError: true,
    }),
    filesize(),
  ],
};
