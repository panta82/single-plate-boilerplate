module.exports = {
  verbose: true,
  testURL: 'http://localhost/',
  transform: {
    '^.+\\.vue$': 'vue-jest',
    '.+\\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$': 'jest-transform-stub',
    '^.+\\.(js|jsx)?$': 'babel-jest',
  },
  moduleFileExtensions: ['js', 'ts', 'json', 'vue'],
};
