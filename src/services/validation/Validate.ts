import { dedupe } from 'util/array'
import Regex from 'config/regex'

namespace Validate {
  export function emailFormat(email: string): string | null {
    if (!email.trim()) {
      return 'Email нужен обязательно'
    }
    if (!Regex.email.test(email)) {
      return 'Это недействительный email'
    }
    return null
  }

  export function username(username: string): string | null {
    if (!username.trim()) {
      return 'Введи имя пользователя'
    } else if (username.length < 4) {
      return 'Имя пользователя должно быть не короче 4 символов'
    } else if (username.length > 64) {
      return 'Имя пользователя должно быть не длиннее 64 символов'
    } else if (!Regex.username.test(username)) {
      const forbiddenChars = username.match(Regex.usernameForbiddenChars)!

      return `Нельзя использовать символы: ${dedupe(forbiddenChars)
        .map((x) => `"${x}"`)
        .join(', ')}`
    }
    return null
  }

  export function password(password: string): string | null {
    if (!password) {
      return 'Введи пароль'
    }
    if (password.length < 8) {
      return 'Пароль должен быть не короче 8 символов'
    }
    if (password.length > 128) {
      return 'Пароль должен быть не длиннее 128 символов'
    }
    return null
  }
}
export default Validate
