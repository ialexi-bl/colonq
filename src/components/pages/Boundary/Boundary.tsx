import { CUTE_FACE } from 'config/view'
import { PageContainer } from 'components/shared/Page'
import ApiClient from 'services/client'
import ApiClientContext from 'services/client/context'
import Config from 'config'
import Endpoint from 'config/endpoint'
import React, { ErrorInfo, ReactNode } from 'react'
import TitleLine from 'components/shared/TitleLine'
import styles from './Boundary.module.scss'

export type BoundaryProps = {
  children?: ReactNode
} & (
  | { global?: false }
  | { global: true; applyClassName: (className: string) => unknown }
)

declare const Ya: any
export default class Boundary extends React.Component<BoundaryProps> {
  static contextType = ApiClientContext
  public context!: ApiClient

  public state = {
    hasError: false,
  }

  static getDerivedStateFromError() {
    return {
      hasError: true,
    }
  }

  componentDidCatch(e: Error, info: ErrorInfo) {
    if (this.props.global) {
      this.props.applyClassName('p-0')
    }

    let gaId, ymId
    /* eslint-disable no-undef */
    try {
      gaId = ga.getAll()[0].get('clientId')
    } catch (e) {}
    try {
      ymId = Ya._metrika.getCounters()[0].id
    } catch (e) {}
    /* eslint-enable no-undef */

    const client = this.context
    client
      .post(Endpoint.api.logError, {
        json: {
          type: 'page',
          gaId,
          ymId,
          name: e.name,
          message: e.message,
          stack: `${e.stack}\nComponents stack: ${info.componentStack}`,
        },
      })
      .catch(() => {})
  }

  render() {
    if (!Config.IS_PROD || !this.state.hasError) {
      return this.props.children
    }

    return (
      <PageContainer className={styles.Boundary}>
        <TitleLine>
          ERROR
          <p className={styles.Subtitle}>
            Что-то сломалось {CUTE_FACE}. Попробуй обновить страницу, если не
            получится - вернись позже. Всё обязательно заработает
          </p>
        </TitleLine>
      </PageContainer>
    )
  }
}
