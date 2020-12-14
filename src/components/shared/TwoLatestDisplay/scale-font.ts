/**
 * Makes element fit at most 40% of window height and returns
 * horizontal scale that must be applied to the element
 * @param e - Element
 */
export default function fitHeightAndGetScale(e: HTMLElement) {
  const windowHeight = window.innerHeight

  let width = e.clientWidth
  let i = 0

  while (i++ < 50 && e.clientHeight / windowHeight > 0.3) {
    width += 100
    // For some reason just width doesn't always work, min-width is also necessary
    e.style.width = e.style.minWidth = `${width}px`
  }

  const diff = window.innerWidth - width

  if (diff < 0) {
    const ds = Math.abs(diff)
    const scale = 1 - ds / width
    return scale
  }

  return 1
}
