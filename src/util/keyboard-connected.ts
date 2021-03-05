const isUnconnected = window.matchMedia(
  'only all and (pointer: coarse), all and (hover: none)',
)

export default function isKeyboardConnected(): boolean {
  return !isUnconnected.matches
}
