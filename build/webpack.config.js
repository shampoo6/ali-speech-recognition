const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    libraryTarget: 'commonjs2',
    filename: 'index.js',
    path: path.resolve(__dirname, '../dist')
  }
}