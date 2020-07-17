import { AppState } from 'store/types'
import { Endpoints } from 'config/endpoints'
import { ScrollablePage } from 'components/shared/Page'
import { notifyInfo } from 'store/view'
import { signin } from 'config/routes'
import { unauthenticate } from 'store/auth'
import { useDispatch, useSelector } from 'react-redux'
import ApiClient from 'services/client'
import InfoItem from 'components/shared/InfoItem'
import LangNotifications from 'lang/notifications.json'
import PageTitle from 'components/shared/PageTitle'
import React, { useCallback } from 'react'
import User from 'components/icons/User'
import useIsAuthenticated from 'hooks/shared/use-is-authenticated'

export default function ProfileUser() {
  const shouldDisplay = useIsAuthenticated(signin())

  const dispatch = useDispatch()
  const { name, email, providers } = useSelector(
    (state: AppState) => state.auth,
  )
  const logout = useCallback(() => {
    ApiClient.check = null
    dispatch(unauthenticate())
    dispatch(notifyInfo(LangNotifications.logout))

    ApiClient.post(Endpoints.Auth.logout, {
      mode: 'cors',
      credentials: 'include',
      authenticate: true,
    }).catch(() => {
      // TODO: probably add error logging although the only error
      // that can happen here is network problem
    })
  }, [dispatch])

  if (!shouldDisplay) {
    return null
  }

  return (
    <ScrollablePage>
      <PageTitle icon={<User />} label={'Профиль'} />
      <div className={'px-4'}>
        <InfoItem label={'Имя'} value={name} />
        <InfoItem label={'Email'} value={email} />
        <p>
          Свяжи аккаунт с другими социальными сетями, если ты хочешь выполнять
          через них вход или если у тебя уже есть аккаунт ColonQ, связанный с
          другой сетью
        </p>
      </div>
    </ScrollablePage>
  )
}
