import {
  ActiveLetter,
  Letter,
  LetterTitle,
  WrongLetter,
} from 'components/shared/LetterTitle'
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

    let gaId, ymId
    /* eslint-disable no-undef */
    try {
      // @ts-ignore
      gaId = ga.getAll()[0].get('clientId')
    } catch (e) {}
    try {
      // @ts-ignore
      ymId = Ya._metrika.getCounters()[0].id
    } catch (e) {}
    /* eslint-enable no-undef */

    ApiClient.post(Endpoints.Api.logError, {
      json: {
        type: 'page',
        gaId,
        ymId,
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
          <LetterTitle
            className={cn(cssUtil.routeTransitionDown, styles.Title)}
          >
            <ActiveLetter>E</ActiveLetter>
            <Letter>R</Letter>
            <Letter>R</Letter>
            <WrongLetter>O</WrongLetter>
            <Letter>R</Letter>
          </LetterTitle>
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
