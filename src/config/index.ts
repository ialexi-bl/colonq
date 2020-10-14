namespace Config {
  export type SupportedProvider = 'vk' | 'google'

  export const IS_DEV = process.env.NODE_ENV !== 'production'
  export const IS_PROD = process.env.NODE_ENV === 'production'

  export const REACT_APP_GA_ID = process.env.REACT_APP_GA_ID || ''
  export const REACT_APP_YM_ID = +(process.env.REACT_APP_YM_ID || -1)

  export const API_URL = process.env.REACT_APP_API_URL || ''
  export const CHECK_COOKIE = IS_PROD ? '__Host-check' : 'check'
}
export default Config
