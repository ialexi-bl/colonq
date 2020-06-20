import { AppState, MixedDispatch, ThunkAction } from 'store/types'
import { Button } from 'components/shared/Button'
import { Endpoints } from 'config/endpoints'
import { ErrorMessage } from 'components/form/ErrorMessage'
import { Input } from 'components/form/Input'
import { PageContainer } from 'components/shared/Page'
import { TextArea } from 'components/form/Input/TextArea'
import { Title } from 'components/shared/Title'
import { cssUtil } from 'styles'
import { emailRegex } from 'config/regex'
import { handleRequestError } from 'services/errors/handle-request-error'
import { hideLoading, showLoading, toggleNav } from 'store/view'
import { useDispatch, useSelector } from 'react-redux'
import ApiClient from 'services/client'
import React, { useState } from 'react'
import cn from 'clsx'
import styles from './Feedback.module.scss'

const errors = [
  '',
  'Сообщение слишком короткое',
  'Нужно указать e-mail',
  'Неверный e-mail',
]
export default function Feedback() {
  const dispatch = useDispatch<MixedDispatch>()
  const { authenticated, email: _email } = useSelector(
    (state: AppState) => state.auth,
  )
  const [done, setDone] = useState(false)
  const [email, setEmail] = useState(_email?.trim() || '')
  const [message, setMessage] = useState('')
  const [error, setError] = useState<1 | 2 | 3 | null>(null)

  const validateEmail = () => {
    if (!authenticated) {
      if (!email.trim()) {
        setError(2)
        return false
      }
      if (!emailRegex.test(email)) {
        setError(3)
        return false
      }
    }
    setError(null)
    return true
  }
  const change = (value: string) => {
    setMessage(value)
    if (error === 1 && value.length > 20) {
      setError(null)
    }
  }
  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateEmail()) {
      return
    }
    if (message.trim().length < 20) {
      return setError(1)
    }
    dispatch(upload(authenticated ? null : email, message)).then((success) =>
      setDone(success),
    )
  }

  if (done) {
    return (
      <PageContainer className={cn('centered', styles.Container)}>
        <Title level={2}>Спасибо за отзыв!</Title>
        <Button onClick={() => dispatch(toggleNav(true))}>
          Продолжить занятия
        </Button>
      </PageContainer>
    )
  }

  return (
    <PageContainer
      className={cn(
        cssUtil.centered,
        cssUtil.routeTransitionLeft,
        styles.Container,
      )}
    >
      <form className={styles.Form} onSubmit={submit}>
        <Title level={2}>Обратная связь</Title>
        <p>
          Попалась ошибка, или хочешь новую функцию? Опиши как можно подробнее!
        </p>
        {!authenticated && (
          <Input
            invalid={!!error && error >= 2}
            onChange={setEmail}
            value={email}
            onBlur={validateEmail}
            placeholder={'E-mail'}
          />
        )}
        <TextArea
          invalid={error === 1}
          className={styles.TextArea}
          placeholder={'Сообщение'}
          onChange={change}
          value={message}
        />
        <span className={styles.Hint}>
          {message.length === 0
            ? 'Хотя бы 20 символов'
            : message.length < 20
            ? `Ещё ${20 - message.length} символов`
            : `Можно отправлять!`}
        </span>
        <ErrorMessage message={error && errors[error]} />
        <Button
          disabled={error !== null}
          className={styles.Button}
          type={'submit'}
        >
          Отправить
        </Button>
      </form>
    </PageContainer>
  )
}

function upload(
  email: string | null,
  message: string,
): ThunkAction<Promise<boolean>> {
  return async (dispatch) => {
    try {
      dispatch(showLoading('Feedback'))
      await ApiClient.post(Endpoints.Api.feedback, {
        authenticate: 'optionally',
        json: {
          message,
          email: email,
        },
      })
      return true
    } catch (e) {
      dispatch(handleRequestError(e))
    } finally {
      dispatch(hideLoading('Feedback'))
    }
    return false
  }
}
