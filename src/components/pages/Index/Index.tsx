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
import React, { useEffect, useRef, useState } from 'react'
import styles from './Index.module.scss'

export default function Index() {
  const dispatch = useDispatch()

  const ref = useRef<null | HTMLDivElement>(null)
  const [scrollOffset, setScrollOffset] = useState(0)
  useEffect(() => {
    const resize = () => {
      const { current: elem } = ref
      if (elem) {
        setScrollOffset(elem.offsetWidth - elem.clientWidth)
      }
    }
    resize()
    window.addEventListener('resize', resize)
    return () => window.removeEventListener('resize', resize)
  }, [])

  return (
    <PageContainer
      className={cssUtil.centered}
      style={{ marginRight: -scrollOffset }}
    >
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
          Твоя лучшая подружка в закреплении знаний
        </Subtitle>
        <Button
          className={cssUtil.routeTransitionLeft}
          onClick={() => dispatch(toggleNav(true))}
        >
          Начать
        </Button>
      </TitleLine>
    </PageContainer>
  )
}
