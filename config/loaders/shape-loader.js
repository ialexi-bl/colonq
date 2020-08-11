function round(n, p = 1000) {
  return Math.round(n * p) / p
}
// Turns normal path into relative path by converting points relative
// to viewbox into percents
function transformPath(str, w = 184, h = 33) {
  return str
    .replace(/([ML])([\d\.]+)\s+([\d\.]+)/g, (_, p1, p2, p3) => {
      return `${p1}${round(p2 / w)} ${round(p3 / h)}`
    })
    .replace(/([HV])([\d\.]+)/g, (_, p1, p2) => {
      return `${p1}${round(p2 / (p1 == 'H' ? w : h))}`
    })
}

/**
 * This custom loader extracts svg paths from .shape.svg files that can then
 * be imported from js files and used to form clip paths
 */
module.exports = function shapeLoader(source) {
  const viewbox = source.match(/viewbox="0 0 (\d+) (\d+)"/i) || [, '100', '100']
  const width = +viewbox[1]
  const height = +viewbox[2]
  const match = source.match(/d=['"].+?['"]/g)

  return `export default [${
    !match
      ? ''
      : match
          .map((x) => `"${transformPath(x.slice(3, -1), width, height)}"`)
          .join(',')
  }]`
}
