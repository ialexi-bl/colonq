import { LinkButton } from 'components/shared/Button'
import { PageContainer } from 'components/shared/Page'
import { appsList } from 'config/routes'
import Logo from 'components/icons/Logo'
import React from 'react'
import cn from 'clsx'
import styles from './NotFound.module.scss'

export default () => (
  <PageContainer
    className={'flex flex-col md:flex-row-reverse justify-center items-center'}
  >
    <div className={'mb-24'}>
      <div className={'flex flex-col text-center mb-8'}>
        <h1 className={'text-4xl mb-2'}>Такой страницы нет</h1>
        <p>ColonQ в недоумении</p>
      </div>
      <Logo className={cn(styles.Monster, 'mx-6 w-64 h-64')} />
    </div>
    <LinkButton to={appsList()} className={'min-w-64'}>
      На главную
    </LinkButton>
  </PageContainer>
)
