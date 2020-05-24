import {
  ActiveTitleLetter,
  RedTitleLetter,
  StyledTitle,
  TitleLetter,
} from 'components/shared/StyledTitle'
import { CUTE_FACE } from 'config/view'
import { Endpoints } from 'config/endpoints'
import { PageContainer } from 'components/shared/Page'
import { Subtitle } from 'components/shared/Subtitle'
import { TitleLine } from 'components/shared/TitleLine'
import { cssUtil } from 'styles'
import ApiClient from 'services/client'
import React, { ErrorInfo } from 'react'
import cn from 'clsx'
import styles from './Boundary.module.scss'

declare const gtag: Gtag.Gtag
declare const ym: ym.Event

const MESSAGE = `Что-то сломалось ${CUTE_FACE}`

export class Boundary extends React.Component<
  | {
      global?: false
    }
  | {
      global: true
      applyClassName: (className: string) => unknown
    }
> {
  state = {
    hasError: false,
  }

  static getDerivedStateFromError() {
    return {
      hasError: true,
    }
  }

  componentDidCatch(e: Error, info: ErrorInfo) {
    if (this.props.global) {
      this.props.applyClassName('no-padding')
    }
    ApiClient.post(Endpoints.Api.logError, {
      json: {
        type: 'page',
        name: e.name,
        message: e.message,
        stack: `${e.stack}\nComponents stack: ${info.componentStack}`,
      },
    }).catch(() => {})
  }

  render() {
    if (!this.state.hasError) {
      return this.props.children
    }

    return (
      <PageContainer className={styles.Boundary}>
        <TitleLine className={cssUtil.routeTransitionBgOpacity}>
          <StyledTitle
            className={cn(cssUtil.routeTransitionDown, styles.Title)}
          >
            <ActiveTitleLetter>E</ActiveTitleLetter>
            <TitleLetter>R</TitleLetter>
            <TitleLetter>R</TitleLetter>
            <RedTitleLetter>O</RedTitleLetter>
            <TitleLetter>R</TitleLetter>
          </StyledTitle>
          <Subtitle
            className={cn(cssUtil.routeTransitionDown, styles.Subtitle)}
          >
            Что-то сломалось {CUTE_FACE}. Попробуй обновить страницу, если не
            получится - вернись позже. Всё обязательно заработает
          </Subtitle>
        </TitleLine>
      </PageContainer>
    )
  }
}
