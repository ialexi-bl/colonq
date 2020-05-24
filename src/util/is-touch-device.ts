// From https://stackoverflow.com/questions/4817029/whats-the-best-way-to-detect-a-touch-screen-device-using-javascript

export function isTouchDevice() {
  const prefixes = ['-webkit-', '-moz-', '-o-', '-ms-']

  if (
    'ontouchstart' in window ||
    // @ts-ignore
    (window.DocumentTouch &&
      // @ts-ignore
      document instanceof DocumentTouch) /* eslint-disable-line no-undef */
  ) {
    return true
  }

  const query = ['(', prefixes.join('touch-enabled),('), 'heartz', ')'].join('')
  return window.matchMedia(query).matches
}
