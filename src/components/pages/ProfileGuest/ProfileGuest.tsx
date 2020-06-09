import { AppState } from 'store/types'
import { Endpoints } from 'config/endpoints'
import { PageContainer } from 'components/shared/Page'
import { SocialLoginButton } from 'components/form/SocialLoginButton'
import { Title } from 'components/shared/Title'
import { cssUtil } from 'styles'
import { profile } from 'config/routes'
import { replace } from 'connected-react-router'
import { useDispatch, useSelector } from 'react-redux'
import React, { useEffect } from 'react'
import cn from 'clsx'
import styles from './ProfileGuest.module.scss'

export default function ProfileGuest() {
  const dispatch = useDispatch()
  const { authenticated, loading } = useSelector(
    (state: AppState) => state.auth,
  )

  useEffect(() => {
    if (!loading && authenticated) {
      dispatch(replace(profile()))
    }
  }, [loading, authenticated, dispatch])

  if (loading || authenticated) return null

  return (
    <PageContainer className={cn(cssUtil.centered, styles.Container)}>
      <div className={cn(cssUtil.routeTransitionRight, styles.AuthBlock)}>
        <Title level={2} className={styles.AuthTitle}>
          Вход
        </Title>
        <p>
          Войди, чтобы настройки синхронизировались на нескольких устройствах
        </p>
        <SocialLoginButton
          href={Endpoints.OAuth.google}
          className={styles.AuthButton}
          provider={'google'}
        />
        <SocialLoginButton
          href={Endpoints.OAuth.vk}
          className={styles.AuthButton}
          provider={'vk'}
        />
      </div>
    </PageContainer>
  )
}
