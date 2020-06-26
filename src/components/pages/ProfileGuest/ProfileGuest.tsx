import { Endpoints } from 'config/endpoints'
import { PageContainer } from 'components/shared/Page'
import { SocialLoginButton } from 'components/form/SocialLoginButton'
import { Title } from 'components/shared/Title'
import { cssUtil } from 'styles'
import { profile } from 'config/routes'
import { useGuestRoute } from 'hooks/use-guest-route'
import React from 'react'
import cn from 'clsx'
import styles from './ProfileGuest.module.scss'

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
