export type SupportedProvider = 'vk' | 'google'

const IS_DEV = process.env.NODE_ENV !== 'production'
const IS_PROD = process.env.NODE_ENV === 'production'

const FEEDBACK_EMAIL = process.env.REACT_APP_FEEDBACK_EMAIL || ''
const REACT_APP_YM_ID = +(process.env.REACT_APP_YM_ID || -1)

const VAPID_KEY = process.env.REACT_APP_VAPID_KEY || ''

const APP_URL = process.env.REACT_APP_URL || ''
const API_URL = process.env.REACT_APP_API_URL || ''
const CORS_MODE =
  process.env.REACT_APP_ENABLE_CORS === 'true'
    ? ('include' as const)
    : ('same-origin' as const)
const CHECK_COOKIE = IS_PROD ? '__Host-check' : 'check'

const Config = {
  IS_DEV,
  IS_PROD,
  FEEDBACK_EMAIL,
  REACT_APP_YM_ID,
  VAPID_KEY,
  APP_URL,
  API_URL,
  CORS_MODE,
  CHECK_COOKIE,
}
export default Config
