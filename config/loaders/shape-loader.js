const htmlparser = require('htmlparser2')

function round(n, p = 1000) {
  return Math.round(n * p) / p
}
// Turns normal path into relative path by converting points relative
// to viewbox into percents
function transformPath(str, sx, sy, w, h) {
  sx /= w
  sy /= h

  return str
    .replace(
      /([C])([\d\.e-]+)[\s,]+([\d\.e-]+)[\s,]+([\d\.e-]+)[\s,]+([\d\.e-]+)[\s,]+([\d\.e-]+)[\s,]+([\d\.e-]+)/g,
      (_, t, n1, n2, n3, n4, n5, n6) => {
        return `${t}${round(Number(n1) / w) + sx} ${round(
          Number(n2) / h + sy,
        )} ${round(Number(n3) / w + sx)} ${round(Number(n4) / h + sy)} ${round(
          Number(n5) / w + sx,
        )} ${round(Number(n6) / h + sy)}`
      },
    )
    .replace(/([ML])([\d\.e-]+)[\s,]+([\d\.e-]+)/g, (_, t, n1, n2) => {
      return `${t}${round(Number(n1) / w + sx)} ${round(Number(n2) / h + sy)}`
    })
    .replace(/([HV])([\d\.e-]+)/g, (_, t, n) => {
      return `${t}${round(t == 'H' ? Number(n) / w + sx : Number(n) / h + sy)}`
    })
}
function flatten(arr) {
  let result = []
  arr.forEach((x) => (result = result.concat(x)))
  return result
}

/**
 * This custom loader extracts svg paths from .shape.svg files that can then
 * be imported from js files and used to form clip paths
 */
module.exports = function shapeLoader(source) {
  const dom = htmlparser.parseDOM(source)

  const paths = flatten(
    dom.map((svg) => {
      if (svg.type !== 'tag' || svg.name !== 'svg') return

      const viewbox = svg.attribs.viewbox || ''
      let [sx = 0, sy = 0, w, h] = viewbox.split(/\s+/).map(Number)
      if (!w || !h) {
        console.warn(`Invalid or no viewbox in "${this.resourcePath}"`)
        w = h = 100
      }
      sx = sx || 0
      sy = sy || 0

      return svg.children.map((path) => {
        if (path.type !== 'tag' || path.name !== 'path') return

        let { name, d } = path.attribs
        if (!name) {
          name = 'unknown'
          console.warn(`No name for path in ${this.resourcePath}`)
        }
        if (!d) {
          console.warn(`Path with no "d" attribute in ${this.resourcePath}`)
          return
        }

        return `{name:"${name.replace(/"/g, '\\"')}",shape:"${transformPath(
          d,
          sx,
          sy,
          w,
          h,
        )}"}`
      })
    }),
  ).filter(Boolean)

  return `export default [${paths.join(',')}]`
}
