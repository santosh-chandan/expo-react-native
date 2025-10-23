module.exports = {
  preset: 'jest-expo', // 👈 this preset is Expo-friendly
  setupFilesAfterEnv: [
    '@testing-library/jest-native/extend-expect',
  ],
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?react-native|@react-native|expo(nent)?|@expo(nent)?|expo-router|react-clone-referenced-element|react-navigation|@react-navigation)',
  ],
  testPathIgnorePatterns: [
    '/node_modules/',
    '/android/',
    '/ios/',
  ],
  moduleFileExtensions: ['js', 'jsx', 'json', 'ts', 'tsx'],
  testEnvironment: 'jsdom',
};
