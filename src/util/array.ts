export function dedupe(array: string[]) {
  const elems: Record<string, true> = {}

  return array.filter((x) => {
    if (x in elems) return false

    elems[x] = true
    return true
  })
}
