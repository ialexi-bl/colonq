import * as ky from 'ky'

declare module 'ky' {
  export default ky

  export interface Options {
    authenticate?: boolean | null | 'optionally'
    notifyErrors?: boolean
    notifyErrorsExcept?: string[]
  }
  export interface NormalizedOptions {
    authenticate?: boolean | null | 'optionally'
    notifyErrors?: boolean
    notifyErrorsExcept?: string[]
  }
}
