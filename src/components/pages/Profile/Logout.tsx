import { UserApi } from 'services/api'
import { notifyInfo } from 'store/view'
import { unauthenticate } from 'store/user'
import { useDispatch } from 'react-redux'
import { useState } from 'react'
import Accordion from 'components/shared/Accordion'
import Button from 'components/shared/Button'
import LangNotifications from 'lang/notifications.json'

export default function Logout() {
  const [started, setStarted] = useState(false)
  const dispatch = useDispatch()
  const logout = () => {
    dispatch(unauthenticate())
    dispatch(notifyInfo(LangNotifications.logout))
    UserApi.logout()
  }

  return (
    <Accordion
      className={'self-end text-right'}
      expanded={started}
      summary={
        <Button
          className={'mt-6 w-64 text-lg'}
          onClick={() => setStarted(true)}
          secondary
        >
          Выход
        </Button>
      }
      details={
        <>
          <p>Точно хочешь выйти?</p>
          <Button secondary onClick={logout} className={'max-w-xs'}>
            Подтвердить
          </Button>
        </>
      }
    />
  )
}
