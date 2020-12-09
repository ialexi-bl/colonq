const HtmlWebpackPlugin = require('html-webpack-plugin')

const FONTS_EXTENSIONS = ['otf', 'ttf', 'eot', 'woff', 'woff2']

class PreloadFontsPlugin {
  apply(compiler) {
    compiler.hooks.compilation.tap('PreloadFontsPlugin', (compilation) => {
      HtmlWebpackPlugin.getHooks(compilation).beforeEmit.tapAsync(
        'PreloadFontsPlugin',
        (data, cb) => {
          const fonts = compilation
            .getAssets()
            .filter((x) => FONTS_EXTENSIONS.some((ext) => x.name.endsWith(ext)))

          const SPLIT = '</title>'
          const [start, end] = data.html.split(SPLIT)
          const source = [start, SPLIT]
          for (let font of fonts) {
            source.push(
              `<link rel="preload" href="/${font.name}" as="font" crossorigin="anonymous">`,
            )
          }
          source.push(end)
          data.html = source.join('')
          cb(null, data)
        },
      )
    })
  }
}
module.exports = PreloadFontsPlugin
