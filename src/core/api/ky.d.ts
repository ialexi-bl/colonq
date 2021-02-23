import * as ky from 'ky'

declare module 'ky' {
  export default ky

  export interface Options {
    token?: undefined | null | string
    authenticate?: boolean | null | 'optionally'
  }
  export interface NormalizedOptions {
    token?: undefined | null | string
    authenticate?: boolean | null | 'optionally'
  }
}
