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
          <h2 className={cn('mb-4 text-5xl', styles.Title)}>
            <span>C</span>
            <LetterButton>O</LetterButton>
            <span>L</span>
            <LetterButton>O</LetterButton>
            <span>N</span>
            <LetterButton state={'correct'}>Q</LetterButton>
          </h2>
          <h2 className={'text-center text-2xl mb-3'}>
            Твоя лучшая подружка в закреплении знаний по русскому языку
          </h2>
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
            className={'text-xl w-64'}
          >
            Начать
          </Button>
        </Screen>
        <Screen>
          <TitleLine>
            <h2 className={'text-3xl mb-6 text-center'}>
              Учись быстрее, запоминай надолго
            </h2>
            <p>
              Хорошо понимать предмет и знать правила очень важно, но без
              закрепления знаний не обойтись. ColonQ предлагает удобные
              тренажеры, чтобы облегчить этот процесс
            </p>
          </TitleLine>
        </Screen>
        <Screen className={'px-4'}>
          <h2 ref={listStart} className={'text-3xl mb-6 text-center'}>
            Выбери тему и занимайся каждый день
          </h2>
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
            className={'mb-3'}
          />
          <ThemeCard to={'#'} label={'Скоро больше!'} />
        </Screen>
        <Screen className={'mb-5 px-4'}>
          <h2 className={'text-3xl mb-4 text-center'}>
            Удобнее заниматься в приложении?
          </h2>
          <p className={cn('text-2xl text-center mb-4', styles.Subtitle)}>
            Установи ColonQ на рабочий стол и включи уведомления, чтобы не
            пропускать занятия
          </p>
          <div className={'flex flex-col'}>
            <Button className={'text-xl mb-2'}>Установить</Button>
            <Button className={'text-xl'} secondary>
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
