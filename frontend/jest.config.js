module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFiles: ['./jest.polyfills.js'],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
    '^.+\\.jsx?$': 'babel-jest',
  },
  testMatch: ['**/?(*.)+(spec|test).ts?(x)'],
  transformIgnorePatterns: [
    '/node_modules/(?!(@bundled-es-modules)/)',
  ],
  testEnvironmentOptions: {
    customExportConditions: [''],
  },
};
