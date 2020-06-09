const { resolve } = require('path')
const getWebpackConfig = require('./config/webpack.config')

const styleLoader = require.resolve('style-loader')
function isCss(regex) {
  return regex.test('abc.module.scss') || regex.test('abc.module.css')
}

module.exports = (webpack) => {
  webpack.module.rules.push(
    ...getWebpackConfig('development')
      .module.rules.find((rule) => {
        return rule.oneOf
      })
      .oneOf.filter(({ test }) => {
        if (Array.isArray(test)) {
          return test.some(isCss)
        } else if (test) {
          return isCss(test)
        }
      })
      .map((rule) => {
        console.log(require.resolve('style-loader'))
        return {
          ...rule,
          use: rule.use.map((use) => {
            if (typeof use === 'string') {
              if (use !== styleLoader) {
                return use
              }
              return {
                loader: use,
                options: { hmr: false },
              }
            }
            if (!use.loader || use.loader !== styleLoader) {
              return use
            }
            console.log(use)
            return {
              ...use,
              options: {
                ...use.options,
                hmr: false,
              },
            }
          }),
        }
      }),
  )
  // webpack.module.rules.push({
  //   test: /\.module\.scss$/,
  //   use: [
  //     {
  //       loader: require.resolve('style-loader'),
  //       options: {
  //         hmr: false,
  //       },
  //     },
  //     {
  //       loader: require.resolve('css-loader'),
  //       options: {
  //         importLoaders: 1,
  //         modules: {
  //           mode: 'local',
  //         },
  //       },
  //     },
  //     {
  //       loader: require.resolve('sass-loader'),
  //       options: {
  //         implementation: require('sass'),
  //         sassOptions: {
  //           includePaths: [resolve(__dirname, './src')],
  //         },
  //       },
  //     },
  //   ],
  // })
  webpack.resolve.modules = (
    webpack.resolve.modules || ['node_modules']
  ).concat(resolve(__dirname, 'src'))

  return webpack
}
