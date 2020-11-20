import { Elevation } from 'config/view'
import { LinkButton } from 'components/shared/Button'
import { PageContainer, ScrollablePage } from 'components/shared/Page'
import { RouteComponentProps, login, register } from 'config/routes'
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

  useEffect(() => {
    setProgress(100)
  }, [setProgress])

  return (
    <ScrollablePage routeElevation={Elevation.index} ref={scrollbars}>
      <PageContainer>
        <div
          className={cn(
            styles.WelcomeBackground,
            '-route-translate-y',
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
          <LinkButton
            className={'text-xl w-full py-4 mb-2 max-w-xs'}
            variant={2}
            to={register()}
          >
            Зарегистрироваться
          </LinkButton>
          <LinkButton
            className={'text-xl w-full py-4 max-w-xs'}
            to={login()}
            secondary
          >
            Войти
          </LinkButton>
          <ScrollIcon className={'h-12 mt-16'} />
        </div>

        <h2 className={'my-32 px-4 text-center text-4xl route-translate-y'}>
          Запомни один раз, не забывай никогда
        </h2>

        <div
          className={cn(
            styles.AdvantagesBackground,
            'bg-secondary-800 route-translate-y',
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
          <LinkButton
            className={'text-xl w-full py-4 mb-2 max-w-xs'}
            variant={2}
            to={register()}
          >
            Зарегистрироваться
          </LinkButton>
          <LinkButton
            className={'text-xl w-full py-4 max-w-xs'}
            to={login()}
            secondary
          >
            Войти
          </LinkButton>
        </div>
      </PageContainer>
    </ScrollablePage>
  )
}

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
