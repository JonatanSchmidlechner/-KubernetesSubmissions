// .eslintrc.js
module.exports = {
  env: {
    node: true,
    es2021: true,
    browser: true
  },
  extends: ["eslint:recommended", "plugin:prettier/recommended"],
  plugins: ["prettier"],
  rules: {
    "prettier/prettier": "error"
  },
  ignorePatterns: ["node_modules/", "dist/", "build/"] // replaces .eslintignore
};
