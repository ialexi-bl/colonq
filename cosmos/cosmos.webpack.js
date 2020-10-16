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

              return { loader: use }
            }

            if (!use.loader || use.loader !== styleLoader) {
              return use
            }

            return {
              ...use,
              options: {
                ...use.options,
                // hmr: false,
              },
            }
          }),
        }
      })

    return rule
  })

  webpack.resolve.modules = (
    webpack.resolve.modules || ['node_modules']
  ).concat(resolve(__dirname, '../src'))
  webpack.watchOptions = {}
  webpack.watchOptions.poll = 1000

  return webpack
}
