/** @type {import("prettier").Config} */
const config = {
  endOfLine: "lf",
  plugins: [
    "@ianvs/prettier-plugin-sort-imports",
    "prettier-plugin-tailwindcss",
  ],
  tailwindStylesheet: "./src/app/globals.css",
  importOrder: [
    "<BUILTIN_MODULES>",
    "",
    "^(next/(.*)$)|^(next$)",
    "",
    "^(react/(.*)$)|^(react$)",
    "",
    "<THIRD_PARTY_MODULES>",
    "",
    "^@/(.*)$",
    "",
    "^[./]",
  ],
  importOrderTypeScriptVersion: "5.0.0",
};

export default config;
