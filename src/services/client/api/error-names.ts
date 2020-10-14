enum ApiErrorName {
  BAD_TOKEN = 'BadTokenError',
  TOKEN_EXPIRED = 'TokenExpiredError',
  UNAUTHORIZED = 'UnauthorizedError',
  BAD_ACCESS_TOKEN = 'AccessTokenError',
  INTERNAL = 'InternalError',
  NOT_FOUND = 'NotFoundError',
  BAD_REQUEST = 'BadRequestError',
  FORBIDDEN = 'ForbiddenError',
  BAD_CREDENTIALS = 'BadCredentialsError',
  SERVICE_UNAVAILABLE = 'ServiceUnavailableError',
  CONFLICT = 'ConflictError',
  MISSING_DATA = 'MissingDataError',
  UNPROCESSABLE_ENTITY = 'UnprocessableEntityError',

  UNKNOWN_ERROR = 'UnknownError',
}
export default ApiErrorName
