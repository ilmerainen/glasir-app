module.exports = {
  env: {
    browser: true,
    es6: true
  },
  extends: [
    "airbnb",
    "prettier",
    "prettier/react",
    "plugin:you-dont-need-lodash-underscore/compatible"
  ],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly"
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2018,
    sourceType: "module"
  },
  plugins: ["react", "react-hooks"],
  rules: {
    "import/no-unresolved": "off",
    "import/no-extraneous-dependencies": "off",
    "react/jsx-indent": ["error", 4],
    "react/jsx-indent-props": ["error", 4],
    "react/forbid-prop-types": ["error", { forbid: ["any"] }],
    "prettier/prettier": "error"
  }
};
