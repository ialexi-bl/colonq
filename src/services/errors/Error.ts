import { NormalizedOptions } from 'ky'
import ErrorName from './ErrorName'

export class ColonqError extends Error {
  constructor(public readonly name: ErrorName, message: string) {
    super(message)
  }
}

export class HttpError extends ColonqError {
  private apiName: string | null = null

  constructor(
    public readonly request: Request,
    public readonly response: Response,
    public readonly options: NormalizedOptions,
  ) {
    super(ErrorName.HTTP_ERRROR, response.statusText)
  }

  async getApiName() {
    if (!this.apiName) {
      try {
        const data = await this.response.json()
        this.apiName = data.error.name || 'UnknownError'
      } catch (e) {
        this.apiName = 'UnknownError'
      }
    }

    return this.apiName
  }
}
export class NetworkError extends ColonqError {
  constructor(message = 'Ошибка сети') {
    super(ErrorName.NETWORK_ERROR, message)
  }
}
export class StorageBlockedError extends ColonqError {
  constructor(message = 'Хранилище недоступно') {
    super(ErrorName.STORAGE_BLOCKED_ERROR, message)
  }
}
export class UnknownError extends ColonqError {
  constructor(message = 'Неизвестная ошибка') {
    super(ErrorName.UNKNOWN_ERROR, message)
  }
}
