const path = require('path');

module.exports = {
  entry: './src/index.ts',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }, {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'tslint-loader',
            options: {
              emitErrors: true,
              failOnHint: true
            }
          }
        ],
        enforce: 'pre',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"]
  },
  target: "node",
  output: {
    path: path.join(__dirname, '/dist'),
    library: "asdata",
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  plugins: []
};
