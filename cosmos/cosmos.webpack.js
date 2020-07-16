const { resolve } = require('path')
const getWebpackConfig = require('../config/webpack.config')

const styleLoader = require.resolve('style-loader')
function isCss(regex) {
  return regex.test('abc.module.scss') || regex.test('abc.module.css')
}
function isPng(regex) {
  return regex.test('abc.png')
}

const rules = getWebpackConfig('development').module.rules
const oneOf = rules.find((rule) => {
  return rule.oneOf
}).oneOf

module.exports = (webpack) => {
  webpack.module.rules.push(
    ...oneOf
      .filter(({ test }) => {
        if (Array.isArray(test)) {
          return test.some(isCss)
        } else if (test) {
          return isCss(test)
        }
      })
      .map((rule) => {
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
    ...oneOf.filter(({ test, ...t }) => {
      if (Array.isArray(test)) {
        return test.some(isPng)
      } else if (test) {
        return isPng(test)
      }
    }),
    {
      test: /\.svg$/,
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            template: (
              { template },
              _,
              { imports, props, jsx },
            ) => template.ast`
                ${imports}
                export const ReactComponent = (${props}) => (${jsx});
              `,
          },
        },
      ],
    },
  )
  webpack.resolve.modules = (
    webpack.resolve.modules || ['node_modules']
  ).concat(resolve(__dirname, '../src'))

  return webpack
}
