import ky from 'ky'

export const HTTPError = ky.HTTPError
export class NetworkError extends Error {
  public readonly name = 'NetworkError'
}
export class UnknownError extends Error {
  public readonly name = 'UnknownError'
}
