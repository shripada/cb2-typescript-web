/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  testPathIgnorePatterns: ['node_modules/(?!node-fetch)', 'dist'],
  transform: {
    '^.+\\.(js)?$': require.resolve('babel-jest'),
  },
};
