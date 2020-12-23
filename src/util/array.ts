/**
 * Removes duplicate elements from an array of strings
 * @param array
 */
export function dedupe<T extends string | number>(array: T[]) {
  const elems = {} as Record<T, true>

  return array.filter((x) => {
    if (x in elems) return false

    elems[x] = true
    return true
  })
}

/**
 * Transforms base64 VAPID key to Uint8Array
 * for notifications subscription
 * @param base64String
 */
export function base64ToUint8Array(base64String: string) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4)
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/')

  const rawData = atob(base64)
  const outputArray = new Uint8Array(rawData.length)

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i)
  }
  return outputArray
}

/**
 * Returns a range object that can be mapped to
 * an array of values
 * @param from - Range start
 * @param to - Range end
 */
export function range<T>(from: number, to: number) {
  return {
    map: (cb: (i: number) => T): T[] => {
      const res: T[] = []
      for (let i = from; i <= to; i++) {
        res.push(cb(i))
      }
      return res
    },
  }
}
