declare module 'lang/errors.json' {
  // TODO: delete all of that

  const LangErrors: {
    missingParameter: string
    tooManyRequests: string
    unauthenticated: string
    missingScope: string
    invalidToken: string
    expiredToken: string
    invalidData: string
    noStorage: string
    tooLong: string
    network: string
    unknown: string
  }
  export default LangErrors
}

declare module 'lang/notifications.json' {
  const LangNotifications: {
    emailVerified: string
    noEmail: string
    logout: string
    signin: string
    link: string
  }
  export default LangNotifications
}
