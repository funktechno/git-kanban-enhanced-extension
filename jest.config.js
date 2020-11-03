module.exports = {
  preset: "@vue/cli-plugin-unit-jest/presets/typescript-and-babel",
  reporters: ["default", "jest-junit"],
  setupFiles: ["<rootDir>/.jest/register-context.js"],
  // collectCoverage: true,
  // "preset": "ts-jest",
  // "testEnvironment": "node",
  collectCoverageFrom: ["src/**/*.{ts,js,vue}", "!**/node_modules/**"],
  transform: {
    // ...
    "vee-validate/dist/rules": "babel-jest"
  },
  transformIgnorePatterns: [
    //  '/node_modules/(?!@babel)',
    "<rootDir>/node_modules/(?!vee-validate/dist/rules)"
  ]
};
