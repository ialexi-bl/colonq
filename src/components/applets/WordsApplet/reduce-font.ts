const cache: Record<
  number,
  {
    above12: boolean
    above16: boolean
    above25: boolean
  }
> = {}

const getBreakpoints = (remWidth: number) => {
  if (cache[remWidth]) return cache[remWidth]
  const mqlAbove12 = matchMedia(`(min-width: ${remWidth * 12}rem)`)
  const mqlAbove16 = matchMedia(`(min-width: ${remWidth * 16}rem)`)
  const mqlAbove25 = matchMedia(`(min-width: ${remWidth * 25}rem)`)
  mqlAbove12.addListener((mql) => (cache[remWidth].above12 = mql.matches))
  mqlAbove16.addListener((mql) => (cache[remWidth].above16 = mql.matches))
  mqlAbove25.addListener((mql) => (cache[remWidth].above25 = mql.matches))

  return (cache[remWidth] = {
    above12: mqlAbove12.matches,
    above16: mqlAbove16.matches,
    above25: mqlAbove25.matches,
  })
}

export const reduceFont = (phrase: string, remWidth: number) => {
  const length = Math.max.apply(
    {},
    phrase.split(/\s+/).map((x) => x.length),
  )
  const { above12, above16, above25 } = getBreakpoints(remWidth)

  if (length <= 8) {
    return {}
  } else if (length <= 12) {
    if (!above12) return { fontSize: '1.7rem' }
  } else if (length <= 16) {
    if (!above16) return { fontSize: '1.5rem' }
  } else if (!above25) {
    return { fontSize: '1.5rem' }
  }
  return {}
}
