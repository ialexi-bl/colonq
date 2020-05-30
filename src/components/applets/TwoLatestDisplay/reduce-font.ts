export const reduceSize = (e: HTMLElement) => {
  const h = window.innerHeight

  let width = e.clientWidth
  let i = 0

  while (i++ < 50 && e.clientHeight / h > 0.4) {
    width += 100
    // For some reason just width doesn't work, min-width is also necessary
    e.style.width = e.style.minWidth = `${width}px`
  }

  const diff = window.innerWidth - width

  if (diff < 0) {
    const ds = Math.abs(diff)
    const scale = 1 - ds / width
    e.style.transform += `scale(${scale})`
    return scale
  }

  return 1
}
