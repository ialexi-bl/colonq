namespace Preferences {
  enum StorageKey {
    NO_ANIMATIONS = 'preferences.no-animations',
  }

  export function animationsEnabled() {
    return (
      localStorage.getItem(StorageKey.NO_ANIMATIONS) !== '1' &&
      !matchMedia('prefers-reduced-motion:reduced').matches
    )
  }

  export function setAnimationsEnabled(state: boolean) {
    localStorage.setItem(StorageKey.NO_ANIMATIONS, String(+state))
  }
}
export default Preferences
