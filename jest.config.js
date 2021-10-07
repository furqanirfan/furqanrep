// /** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  // preset: 'jest',
  testEnvironment: "node",
  collectCoverage: false,
  moduleFileExtensions: ["js", "mjs"],
  Xtransform: {
    "^.+\\.js$": "babel-jest",
    "^.+\\.mjs$": "babel-jest",
  },
  verbose: true,

  testRegex: "((\\.|/*.)(test))\\.js?$",
};
