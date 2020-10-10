function round(n, p = 1000) {
  return Math.round(n * p) / p
}
// Turns normal path into relative path by converting points relative
// to viewbox into percents
function transformPath(str, w = 184, h = 33) {
  return str
    .replace(
      /([C])([\d\.-]+)\s+([\d\.-]+)\s+([\d\.-]+)\s+([\d\.-]+)\s+([\d\.-]+)\s+([\d\.-]+)/g,
      (_, t, n1, n2, n3, n4, n5, n6) => {
        return `${t}${round(n1 / w)} ${round(n2 / h)} ${round(n3 / w)} ${round(
          n4 / h,
        )} ${round(n5 / w)} ${round(n6 / h)}`
      },
    )
    .replace(/([ML])([\d\.-]+)\s+([\d\.-]+)/g, (_, t, n1, n2) => {
      return `${t}${round(n1 / w)} ${round(n2 / h)}`
    })
    .replace(/([HV])([\d\.-]+)/g, (_, t, n) => {
      return `${t}${round(n / (t == 'H' ? w : h))}`
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
