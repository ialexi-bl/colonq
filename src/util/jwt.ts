/**
 * Decodes base 64 preserving unicode characters
 * @param str Base 64 encoded string
 */
function base64decode(str: string) {
  return decodeURIComponent(escape(atob(str)))
}

/**
 * Decodes token payload and returns it (may throw error if
 * the token is invalid)
 * @param token Access token
 */
export function getTokenPayload(token: string): Record<string, any> {
  return JSON.parse(base64decode(token.split('.')[1]))
}

/**
 * Returns amount of milliseconds that represent the time,
 * when the token will expire
 * @param token Access token
 */
export function getTokenExpirationTime(token: string): number {
  try {
    const seconds: number = +getTokenPayload(token).exp || 0
    return seconds * 1000
  } catch (e) {
    return 0
  }
}

/**
 * Tries to get a given field from jwt payload
 * Returns '' if field is absent or token is invalid
 */
export function getTokenField(token: string, field: string): string {
  try {
    const payload = getTokenPayload(token)
    return payload[field] || ''
  } catch (e) {
    return ''
  }
}
