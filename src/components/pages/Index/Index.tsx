import { PageContainer, ScrollablePage } from 'components/shared/Page'
import { app } from 'config/routes'
import Accents from 'components/icons/Accents'
import Button from 'components/shared/Button'
import LetterButton from 'components/shared/LetterButton'
import Orthography from 'components/icons/Orthography'
import Prefixes from 'components/icons/Prefixes'
import React, { useRef } from 'react'
import Scrollbars from 'react-custom-scrollbars'
import ThemeCard from 'components/shared/ThemeCard/ThemeCard'
import Title from 'components/shared/Title'
import TitleLine from 'components/shared/TitleLine'
import Verbs from 'components/icons/Verbs'
import cn from 'clsx'
import styles from './Index.module.scss'

export default function Index() {
  const scrollbars = useRef<Scrollbars | null>(null)
  const listStart = useRef<HTMLHeadingElement | null>(null)

  return (
    <ScrollablePage ref={scrollbars}>
      <PageContainer>
        <Screen className={'px-4'}>
          <Title level={1} className={cn('mb-2', styles.Title)}>
            <span>C</span>
            <LetterButton>O</LetterButton>
            <span>L</span>
            <LetterButton>O</LetterButton>
            <span>N</span>
            <LetterButton state={'correct'}>Q</LetterButton>
          </Title>
          <Title level={2} className={'text-center font-2 mb-4'}>
            Твоя лучшая подружка в закреплении знаний по русскому языку
          </Title>
          <Button
            onClick={() => {
              if (scrollbars.current && listStart.current) {
                const offset = listStart.current.getBoundingClientRect().top
                // @ts-ignore
                scrollbars.current.view.scroll({
                  top: offset,
                  behavior: 'smooth',
                })
              }
            }}
            className={'font-2 w-75'}
          >
            Начать
          </Button>
        </Screen>
        <Screen>
          <TitleLine>
            <Title className={'text-center'} level={2}>
              Учись быстрее, запоминай надолго
            </Title>
            <p>
              Хорошо понимать предмет и знать правила очень важно, но без
              закрепления знаний не обойтись. ColonQ предлагает удобные
              тренажеры, чтобы облегчить этот процесс
            </p>
          </TitleLine>
        </Screen>
        <Screen className={'px-4'}>
          <Title ref={listStart} className={'text-center'} level={2}>
            Выбери тему и занимайся каждый день
          </Title>
          <ThemeCard
            to={app('russian/accents')}
            icon={<Accents />}
            label={'Ударения'}
            className={'mb-3'}
          />
          <ThemeCard
            to={app('russian/prefixes')}
            icon={<Prefixes />}
            label={'Приставки'}
            className={'mb-3'}
          />
          <ThemeCard
            to={app('russian/orthography')}
            icon={<Orthography />}
            label={'Орфография'}
            className={'mb-3'}
          />
          <ThemeCard
            to={app('russian/verb-endings')}
            icon={<Verbs />}
            label={'Окончания глаголов и причастий'}
          />
        </Screen>
        <Screen className={'mb-5 px-4'}>
          <Title className={'text-center'} level={2}>
            Удобнее заниматься в приложении?
          </Title>
          <p className={cn('font-2 text-center mb-4', styles.Subtitle)}>
            Установи ColonQ на рабочий стол и включи уведомления, чтобы не
            пропускать занятия
          </p>
          <div className={'d-flex flex-column'}>
            <Button className={'font-2 mb-2'}>Установить</Button>
            <Button className={'font-2'} secondary>
              Включить уведомления
            </Button>
          </div>
        </Screen>
      </PageContainer>
    </ScrollablePage>
  )
}

const Screen = ({
  children,
  className,
}: HTMLProps.children & HTMLProps.className) => (
  <div className={cn(className, styles.Screen)}>{children}</div>
)
