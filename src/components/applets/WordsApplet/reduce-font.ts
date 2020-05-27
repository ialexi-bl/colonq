export const reduceFont = (e: HTMLElement | null) => {
  if (!e) return

  {
    const rem = parseFloat(getComputedStyle(document.documentElement).fontSize)
    const h = window.innerHeight
    let width = e.clientWidth / rem

    while (e.clientHeight / h > 0.4) {
      width++
      // For some reason just width doesn't work, min-width is also necessary
      e.style.width = e.style.minWidth = `${width}rem`
    }
  }
  {
    const width = e.scrollWidth
    const diff = window.innerWidth - width

    if (diff < 0) {
      const ds = Math.abs(diff)
      e.style.transform = `scale(${1 - ds / width})`
    }
  }
}
