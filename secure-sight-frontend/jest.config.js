// /*
//  * For a detailed explanation regarding each configuration property, visit:
//  * https://jestjs.io/docs/configuration
//  */
// const babelJest = require("babel-jest");

// module.exports = {
//   bail: 1,
//   verbose: true,
//   globals: {
//     __DEV__: true,
//   },
//   transformIgnorePatterns: [
//     "/node_modules/(?!.*\\.(js|jsx|ts|tsx)$)",
//     "/__mocks__/",
//   ],
//   testEnvironmentOptions: {
//     html: '<html lang="zh-cmn-Hant"></html>',
//     url: "https://jestjs.io/",
//     userAgent: "Agent/007",
//   },
//   testEnvironment: "node",
//   testEnvironment: "jsdom",
//   presets: [
//     "@babel/preset-env",
//     ["@babel/preset-react", { runtime: "automatic" }],
//   ],
//   presets: ["@babel/preset-env", "@babel/preset-react"],
//   plugins: ["@babel/plugin-transform-react-jsx"],
//   transform: {
//     "^.+\\.(js|jsx)$": "babel-jest",
//   },
//   transform: {
//     "^.+\\.[jt]sx?$": "babel-jest",
//   },
//   collectCoverageFrom: [
//     "**/*.{js,jsx}",
//     "!**/node_modules/**",
//     "!**/vendor/**",
//   ],
//   coverageReporters: ["clover", "json", "lcov", ["text", { skipFull: true }]],
//   coverageThreshold: {
//     global: {
//       branches: 80,
//       functions: 80,
//       lines: 80,
//       statements: -10,
//     },
//   },

//   moduleNameMapper: {
//     "\\.(css|less)$": "<rootDir>/__mocks__/fileMock.js",
//     "\\.(css|less|scss)$": "identity-obj-proxy",
//     "\\.(jpg|jpeg|png|gif)$": "<rootDir>/__mocks__/fileMock.js",
//   },
// };

// module.exports = babelJest.createTransformer({
//   presets: ["my-custom-preset"],
// });

// // module.exports = {
// //   presets: [
// //     '@babel/preset-env',
// //     ['@babel/preset-react', { runtime: 'automatic' }],
// //   ],
// //   transform: {
// //     '^.+\\.[jt]sx?$': 'babel-jest',
// //     '^.+\\.jsx?$': [
// //       'babel-jest',
// //       {
// //         tsconfig: 'tests/tsconfig.json',
// //       },
// //     ],
// //   },
// //   testEnvironment: 'node',
// //   testRegex: 'tests/.*\\.test\\.ts$',
// //   collectCoverageFrom: ['src/**/*.ts'],
// //   automock: true,
// //   moduleFileExtensions: ['ts', 'js', 'json'],
// //   unmockedModulePathPatterns: [
// //     'jest-editor-support/node_modules',
// //     'color-convert',
// //     'chalk',
// //     'snapdragon',
// //     'ansi-styles',
// //     'core-js',
// //     'debug',
// //     '@babel/template',
// //     'graceful-fs',
// //     '@babel/core',
// //   ],
// //   moduleNameMapper: {
// //     '\\.(svg)$': '<rootDir>/tests/fileMock.ts',
// //   },
// // };

module.exports = {
  bail: 1,
  verbose: true,
  globals: {
    __DEV__: true,
  },
  transformIgnorePatterns: [
    "/node_modules/(?!.*\\.(js|jsx|ts|tsx)$)",
    "/__mocks__/",
  ],
  testEnvironmentOptions: {
    html: '<html lang="zh-cmn-Hant"></html>',
    url: "https://jestjs.io/",
    userAgent: "Agent/007",
  },
  testEnvironment: "node",
  // testEnvironment: "jsdom",
  presets: [
    "@babel/preset-env",
    ["@babel/preset-react", { runtime: "automatic" }],
  ],
  presets: ["@babel/preset-env", "@babel/preset-react"],
  plugins: ["@babel/plugin-transform-react-jsx"],
  setupFilesAfterEnv: ["./jest.setup.js"],
  transform: {
    "^.+\\.(js|jsx)$": "babel-jest",
  },
  transform: {
    "^.+\\.[jt]sx?$": "babel-jest",
    "^.+\\.jsx?$": [
      "babel-jest",
      {
        tsconfig: "tests/tsconfig.json",
      },
    ],
  },
  collectCoverageFrom: [
    "**/*.{js,jsx}",
    "!**/node_modules/**",
    "!**/vendor/**",
  ],
  coverageReporters: ["clover", "json", "lcov", ["text", { skipFull: true }]],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: -10,
    },
  },

  moduleNameMapper: {
    "\\.(css|less)$": "<rootDir>/__mocks__/fileMock.js",
    "\\.(css|less|scss)$": "identity-obj-proxy",
    "\\.(jpg|jpeg|png|gif)$": "<rootDir>/__mocks__/fileMock.js",
  },
  // testEnvironment: 'jsdom',
  // Automatically clear mock calls and instances between every test
  clearMocks: true,
  // The directory where Jest should output its coverage files
  coverageDirectory: ".coverage",
  moduleNameMapper: {
    // "\\.(css|less|scss|sss|styl)$": "<rootDir>/node_modules/jest-css-modules",
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/__mocks__/fileMock.js",
    // "\\.(css|less|scss)$": "<rootDir>/__mocks__/styleMock.js",
    "\\.(css|less|scss|sss|styl)$": "identity-obj-proxy",
  },
  // A list of paths to modules that run some code to configure or set up the testing framework before each test

  testPathIgnorePatterns: ["<rootDir>/.next/", "<rootDir>/node_modules/"],
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "<rootDir>/node_modules/babel-jest",
    // transformer for svg files
  },
};
