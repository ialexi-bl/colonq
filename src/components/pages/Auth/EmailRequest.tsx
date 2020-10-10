import { emailRegex } from 'config/regex'
import Button from 'components/shared/Button'
import ErrorMessage from 'components/form/ErrorMessage'
import Input from 'components/form/Input'
import React, { useState } from 'react'
import styles from './Auth.module.scss'

export function EmailRequest({
  onSubmit,
}: {
  onSubmit: (email: string) => unknown
}) {
  const [email, setEmail] = useState('')
  const [error, setError] = useState<null | string>(null)

  const validate = () => {
    if (!email) return setError('Введи адрес')

    const valid = email.match(emailRegex)
    setError(valid ? null : 'Неверный адрес')
    return valid
  }
  const change = (email: string) => {
    if (error && email && email.match(emailRegex)) setError(null)
    setEmail(email)
  }
  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validate()) {
      onSubmit(email)
    }
  }

  return (
    <form onSubmit={submit} className={styles.Container}>
      <h2 className={styles.Title}>Введи email</h2>
      <Input
        type={'email'}
        value={email}
        state={error ? 'invalid' : null}
        onBlur={validate}
        onChange={(e) => change(e.target.value)}
        placeholder={'Email'}
        className={styles.Input}
      />
      <ErrorMessage message={error} className={styles.Error} />
      <Button disabled={!!error || !email.trim()} type={'submit'}>
        Подтвердить
      </Button>
    </form>
  )
}
