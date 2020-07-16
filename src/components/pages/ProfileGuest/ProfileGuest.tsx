import { Endpoints } from 'config/endpoints'
import { PageContainer } from 'components/shared/Page'
import { cssUtil } from 'styles'
import { profile } from 'config/routes'
import React from 'react'
import SocialLoginButton from 'components/form/SocialLoginButton'
import Title from 'components/shared/Title'
import cn from 'clsx'
import styles from './ProfileGuest.module.scss'
import useGuestRoute from 'hooks/shared/use-guest-route'

export default function ProfileGuest() {
  const shouldDisplay = useGuestRoute(profile())

  if (!shouldDisplay) {
    return null
  }

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
