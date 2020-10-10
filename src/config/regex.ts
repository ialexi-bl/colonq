export const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

export const usernameRegex = /^[\p{L}\p{N}\s_'-]+$/u
export const usernameForbiddenChars = /([^\p{L}\p{N}\s_'-])/gu
