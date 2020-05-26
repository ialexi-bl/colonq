export const reduceFont = (e: HTMLElement | null) => {
  if (!e) return

  const width = e.scrollWidth
  const diff = window.innerWidth - width

  if (diff < 0) {
    const ds = Math.abs(diff)
    console.log(ds, width)
    e.style.transform = `scale(${1 - ds / width})`
  }
}
