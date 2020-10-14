import ErrorName from './ErrorName'

export class ColonqError extends Error {
  constructor(public readonly name: ErrorName, message: string) {
    super(message)
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
