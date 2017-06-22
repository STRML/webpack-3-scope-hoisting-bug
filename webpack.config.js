const webpack = require('webpack');

module.exports = function() {
  return {
    entry: {
      index: './index.js',
    },
    target: 'web',
    output: {
      filename: '[name].build.js'
    },
    module: {
      strictThisContextOnImports: true,
    },
    plugins: [
      new webpack.optimize.ModuleConcatenationPlugin(),
    ],
  };
}
