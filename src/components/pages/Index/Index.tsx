import { AppState } from 'store/types'
import { Elevation } from 'config/view'
import { LinkButton } from 'components/shared/Button'
import {
  RouteComponentProps,
  appsList,
  login,
  profile,
  register,
} from 'config/routes'
import { ScrollablePage } from 'components/shared/Page'
import { useSelector } from 'react-redux'
import Hr from 'components/shared/Hr'
import LetterButton from 'components/shared/LetterButton'
import NotificationIcon from 'components/icons/Notification'
import React, { ReactNode, useEffect, useRef } from 'react'
import ScrollIcon from 'components/icons/Scroll'
import Scrollbars from 'react-custom-scrollbars'
import Suffixes from 'components/icons/dynamic/russian/suffixes'
import Trigonometry from 'components/icons/dynamic/maths/Trigonometry'
import cn from 'clsx'
import styles from './Index.module.scss'

export default function Index({ setProgress }: RouteComponentProps) {
  const scrollbars = useRef<Scrollbars | null>(null)
  const status = useSelector((state: AppState) => state.user.status)

  useEffect(() => {
    setProgress(100)
  }, [setProgress])

  return (
    <ScrollablePage routeElevation={Elevation.index} ref={scrollbars}>
      <div
        className={cn(
          styles.WelcomeBackground,
          'route-up',
          'bg-secondary-800 flex flex-col justify-center items-center px-4',
        )}
      >
        <h1 className={cn('mb-4 text-6xl mt-16', styles.Title)}>
          <span>C</span>
          <LetterButton>O</LetterButton>
          <span>L</span>
          <LetterButton>O</LetterButton>
          <span>N</span>
          <LetterButton state={'correct'}>Q</LetterButton>
        </h1>
        <h2 className={'text-center text-2xl mb-6'}>
          Твоя лучшая подружка в закреплении знаний. Бесплатно.
        </h2>

        {status === 'authenticated' ? <AuthButtons /> : <GuestButtons />}
        <ScrollIcon className={'h-12 mt-16'} />
      </div>

      <h2 className={'my-32 px-4 text-center text-4xl route-down'}>
        Запомни один раз, не забывай никогда
      </h2>

      <div
        className={cn(
          styles.AdvantagesBackground,
          'bg-secondary-800 route-down',
        )}
      >
        <Advantage
          icon={<Suffixes />}
          title={'Русский язык'}
          description={
            'Практикуй правила и учи слова-исключения, чтобы чувствовать себя уверенно на контрольных'
          }
        />
        <Hr />
        <Advantage
          reversed
          icon={<Trigonometry />}
          title={'Математика'}
          description={
            'Запоминай простые факты и не трать драгоценное время экзамена на попытки их вспомнить'
          }
        />
        <Hr />
        <h4 className={'text-center text-3xl my-8'}>Скоро больше!</h4>
      </div>

      <div className={'my-64 px-4 flex flex-col items-center'}>
        <NotificationIcon className={'h-32 w-32 mb-4'} />
        <h3 className={'text-3xl text-center'}>
          Уведомления не позволят пропускать ежедневные занятия
        </h3>
      </div>

      <h2 className={'px-4 mb-6 text-4xl text-center'}>Начни прямо сейчас</h2>
      <div className={'px-4 mb-64 flex flex-col items-center'}>
        {status === 'authenticated' ? <AuthButtons /> : <GuestButtons />}
      </div>
    </ScrollablePage>
  )
}

const AuthButtons = () => (
  <>
    <ActionButton to={appsList()} variant={2}>
      К темам
    </ActionButton>
    <ActionButton to={profile()} secondary>
      Профиль
    </ActionButton>
  </>
)
const GuestButtons = () => (
  <>
    <ActionButton variant={2} to={register()}>
      Зарегистрироваться
    </ActionButton>
    <ActionButton to={login()} secondary>
      Войти
    </ActionButton>
  </>
)

const ActionButton = ({
  secondary,
  children,
  variant,
  to,
}: {
  secondary?: boolean
  children: string
  variant?: 1 | 2 | 3
  to: string
}) => (
  <LinkButton
    className={'text-xl w-full py-4 mb-2 max-w-xs'}
    secondary={secondary}
    variant={variant}
    to={to}
  >
    {children}
  </LinkButton>
)

const Advantage = ({
  icon,
  title,
  description,
  reversed,
}: {
  icon: ReactNode
  title: string
  description: string
  reversed?: boolean
}) => (
  <div
    className={cn('flex h-40 px-4 items-center', {
      'flex-row-reverse': reversed,
    })}
  >
    <div className={cn('h-24 w-24 flex-shrink-0', reversed ? 'ml-6' : 'mr-6')}>
      {icon}
    </div>
    <div>
      <h3 className={'text-3xl text-center mb-2 flex-1'}>{title}</h3>
      <p>{description}</p>
    </div>
  </div>
)
