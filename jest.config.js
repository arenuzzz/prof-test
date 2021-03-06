module.exports = {
  testEnvironment: 'jest-environment-jsdom-fifteen',
  // testEnvironment: 'jest-environment-jsdom-fourteen',
  roots: ['<rootDir>'],
  collectCoverageFrom: ['src/**/*.{js,jsx,ts,tsx}', '!src/**/*.d.ts'],
  setupFiles: ['react-app-polyfill/jsdom'],
  setupFilesAfterEnv: [],
  testMatch: [
    '<rootDir>/src/**/__tests__/**/*.{js,jsx,ts,tsx}',
    '<rootDir>/src/**/*.{spec,test}.{js,jsx,ts,tsx}',
    '<rootDir>/*.{spec,test}.{js,jsx,ts,tsx}',
  ],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': '<rootDir>/node_modules/babel-jest',
    '^.+\\.css$': '<rootDir>/config/jest/cssTransform.js',
    '^(?!.*\\.(js|jsx|ts|tsx|css|json)$)':
      '<rootDir>/config/jest/fileTransform.js',
  },
  transformIgnorePatterns: [
    '[/\\\\]node_modules[/\\\\].+\\.(js|jsx|ts|tsx)$',
    '^.+\\.module\\.(css|sass|scss)$',
  ],
  modulePaths: [],
  moduleFileExtensions: [
    'web.js',
    'js',
    'web.ts',
    'ts',
    'web.tsx',
    'tsx',
    'json',
    'web.jsx',
    'jsx',
    'node',
  ],
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname',
  ],
  moduleNameMapper: {
    'react-i18next': '<rootDir>/src/lib/test-utils/react-i18next',
    '^react-native$': 'react-native-web',
    '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',
    'src/(.*)$': '<rootDir>/src/$1',
    '@root(.*)': '<rootDir>/src/$1',
    '@ui/(.*)': '<rootDir>/src/ui/$1',
    '@styles/(.*)': '<rootDir>/src/styles/$1',
    '@features/(.*)': '<rootDir>/src/features/$1',
    '@lib/(.*)': '<rootDir>/src/lib/$1',
    '@test-utils/(.*)': '<rootDir>/src/lib/test-utils/$1',
    '@api/(.*)': '<rootDir>/src/api/$1',
    '@assets/(.*)': '<rootDir>/src/assets/$1',
    '@images/(.*)': '<rootDir>/src/images/$1',
    '@constants': '<rootDir>/src/constants',
    '@constants/(.*)': '<rootDir>/src/constants/$1',
    '@settings/(.*)': '<rootDir>/src/settings/$1',
    '@types/(.*)': '<rootDir>/src/types/$1',
    '@pages/(.*)': '<rootDir>/src/pages/$1',
  },
};
