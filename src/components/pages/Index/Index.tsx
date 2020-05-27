import {
  ActiveTitleLetter,
  GreenTitleLetter,
  StyledTitle,
  TitleLetter,
} from 'components/shared/StyledTitle'
import { Button } from 'components/shared/Button'
import { PageContainer } from 'components/shared/Page'
import { Subtitle } from 'components/shared/Subtitle'
import { TitleLine } from 'components/shared/TitleLine'
import { cssUtil } from 'styles'
import { toggleNav } from 'store/view'
import { useDispatch } from 'react-redux'
import React from 'react'
import styles from './Index.module.scss'

export default function Index() {
  const dispatch = useDispatch()

  return (
    <PageContainer className={styles.Index}>
      <div className={styles.TitleContainer}>
        <TitleLine className={cssUtil.routeTransitionBgOpacity}>
          <StyledTitle className={cssUtil.routeTransitionLeft}>
            <TitleLetter>C</TitleLetter>
            <ActiveTitleLetter>O</ActiveTitleLetter>
            <TitleLetter>L</TitleLetter>
            <ActiveTitleLetter>O</ActiveTitleLetter>
            <TitleLetter>N</TitleLetter>
            <GreenTitleLetter>Q</GreenTitleLetter>
            <sub className={styles.Version}>α</sub>
          </StyledTitle>
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
