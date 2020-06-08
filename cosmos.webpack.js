const path = require('path')

module.exports = (webpack) => {
  webpack.module.rules.push({
    test: /\.module\.scss$/,
    use: [
      require.resolve('style-loader'),
      {
        loader: require.resolve('css-loader'),
        options: {
          modules: true,
        },
      },
      {
        loader: require.resolve('sass-loader'),
        options: {
          implementation: require('sass'),
          sassOptions: {
            includePaths: [path.resolve(__dirname, './src')],
          },
        },
      },
    ],
  })
  return webpack
}
