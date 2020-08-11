const { resolve } = require('path')
const getWebpackConfig = require('../config/webpack.config')

const styleLoader = require.resolve('style-loader')
function isTs(regex) {
  return regex.test('abc.tsx')
}
function isCss(regex) {
  return regex.test('abc.module.scss') || regex.test('abc.module.css')
}
function isPng(regex) {
  return regex.test('abc.png')
}

const rules = getWebpackConfig('development').module.rules

module.exports = (webpack) => {
  webpack.module.rules = rules.map((rule) => {
    if (rule.oneOf)
      rule.oneOf = rule.oneOf.map((rule) => {
        if (
          !rule.test ||
          (Array.isArray(rule.test)
            ? !rule.test.some(isCss)
            : !isCss(rule.test))
        ) {
          return rule
        }

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
      })

    return rule
  })
  /* 
  webpack.module.rules = webpack.module.rules.filter((rule) => {
    return Array.isArray(rule) || !isTs(rule.test)
  })
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
        return test.some(isPng) || test.some(isTs)
      } else if (test) {
        return isPng(test) || isTs(test)
      }
    }),
    {
      test: /\.svg$/,
      use: [
        {
          loader: require.resolve('url-loader'),
          options: {
            limit: '10000',
            name: 'static/media/[name].[hash:8].[ext]',
          },
        },
        {
          loader: '@svgr/webpack',
          options: {
            template: (
              { template, ...rest },
              _,
              { imports, props, jsx, ...r },
            ) => {
              return template.ast`
                ${imports}
                export default "${_.state.filePath}";
                export const ReactComponent = (${props}) => (${jsx});
              `
            },
          },
        },
      ],
    },
  )
   */

  webpack.resolve.modules = (
    webpack.resolve.modules || ['node_modules']
  ).concat(resolve(__dirname, '../src'))
  webpack.watchOptions = {}
  webpack.watchOptions.poll = 1000

  return webpack
}
