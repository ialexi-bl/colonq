import * as ky from 'ky'

declare module 'ky' {
  export default ky
  export interface Options {
    authenticate?: boolean | null | 'optionally'
  }
  export interface NormalizedOptions {
    authenticate?: boolean | null | 'optionally'
  }
}
