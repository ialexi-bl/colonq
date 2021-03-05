const prefixes = ['-webkit-', '-moz-', '-o-', '-ms-']
const query = ['(', prefixes.join('touch-enabled),('), 'rrrandom', ')'].join('')
const isTouch = window.matchMedia(query)

export default function isTouchDevice(): boolean {
  return (
    isTouch.matches ||
    'ontouchstart' in window ||
    // @ts-ignore
    (window.DocumentTouch && document instanceof DocumentTouch)
  )
}
