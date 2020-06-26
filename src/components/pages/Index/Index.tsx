import {
  ActiveLetter,
  CorrectLetter,
  Letter,
  LetterTitle,
} from 'components/shared/LetterTitle'
import { PageContainer } from 'components/shared/Page'
import { Subtitle } from 'components/shared/Subtitle'
import { TitleLine } from 'components/shared/TitleLine'
import { cssUtil } from 'styles'
import { toggleNav } from 'store/view'
import { useDispatch } from 'react-redux'
import Button from 'components/shared/Button'
import React from 'react'
import styles from './Index.module.scss'

export default function Index() {
  const dispatch = useDispatch()

  return (
    <PageContainer className={styles.Index}>
      <div className={styles.TitleContainer}>
        <TitleLine className={cssUtil.routeTransitionBgOpacity}>
          <LetterTitle className={cssUtil.routeTransitionLeft}>
            <Letter>C</Letter>
            <ActiveLetter>O</ActiveLetter>
            <Letter>L</Letter>
            <ActiveLetter>O</ActiveLetter>
            <Letter>N</Letter>
            <CorrectLetter>Q</CorrectLetter>
            <sub className={styles.Version}>α</sub>
          </LetterTitle>
          <Subtitle className={cssUtil.routeTransitionLeft}>
            Твоя лучшая подружка в усвоении знаний
          </Subtitle>
          <Button
            className={cssUtil.routeTransitionLeft}
            onClick={() => dispatch(toggleNav(true))}
          >
            Начать обучение
          </Button>
        </TitleLine>
      </div>
    </PageContainer>
  )
}
