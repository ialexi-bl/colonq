import { AppState } from 'store/types'
import { Endpoints } from 'config/endpoints'
import { PageContainer } from 'components/shared/Page'
import { cssUtil } from 'styles'
import { notifyInfo } from 'store/view'
import { signin } from 'config/routes'
import { unauthenticate } from 'store/auth'
import { useAuthenticatedRoute } from 'hooks/shared/use-authenticated-route'
import { useDispatch, useSelector } from 'react-redux'
import ApiClient from 'services/client'
import Button from 'components/shared/Button'
import LangNotifications from 'lang/notifications.json'
import React, { useCallback } from 'react'
import SocialLoginButton from 'components/form/SocialLoginButton'
import Title from 'components/shared/Title'
import cn from 'clsx'
import styles from './ProfileUser.module.scss'

export default function ProfileUser() {
  const shouldDisplay = useAuthenticatedRoute(signin())

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
      // that can happen here is network issue
    })
  }, [dispatch])

  if (!shouldDisplay) {
    return null
  }

  return (
    <PageContainer className={styles.Container}>
      <Title
        className={cn(cssUtil.routeTransitionRight, styles.Title)}
        level={3}
      >
        Профиль
      </Title>
      <div
        className={cn(
          cssUtil.routeTransitionBgOpacity,
          styles.Box,
          styles.InfoBox,
        )}
      >
        <div className={cssUtil.routeTransitionRight}>
          <p>{name}</p>
          <p>{email}</p>
        </div>
      </div>
      <Title
        className={cn(cssUtil.routeTransitionLeft, styles.Title)}
        level={3}
      >
        Связать с социальными сетями
      </Title>
      <div
        className={cn(
          cssUtil.routeTransitionBgOpacity,
          styles.Box,
          styles.LinkBox,
        )}
      >
        <div className={cssUtil.routeTransitionLeft}>
          <SocialLoginButton
            href={'#'}
            onClick={() =>
              (window.location.href = Endpoints.OAuth.link.google(
                ApiClient.getToken()!,
              ))
            }
            disabled={providers.includes('google')}
            provider={'google'}
            className={styles.LinkAccount}
          />
          <SocialLoginButton
            href={Endpoints.OAuth.link.vk(ApiClient.getToken()!)}
            disabled={providers.includes('vk')}
            provider={'vk'}
            className={styles.LinkAccount}
          />
        </div>
      </div>
      <Button
        color={'neutral'}
        className={cn(cssUtil.routeTransitionLeft, styles.QuitButton)}
        onClick={logout}
      >
        Выход
      </Button>
    </PageContainer>
  )
}
