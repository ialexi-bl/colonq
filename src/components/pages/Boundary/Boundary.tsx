import { ApiClientProps, withApiClient } from 'hooks/use-api-client'
import { CUTE_FACE } from 'config/view'
import { PageContainer } from 'components/shared/Page'
import Config from 'config'
import GeneralApi from 'services/api/general'
import React, { ErrorInfo, ReactNode } from 'react'
import TitleLine from 'components/shared/TitleLine'
import styles from './Boundary.module.scss'

export type BoundaryProps = ApiClientProps & {
  children?: ReactNode
  global?: boolean
  // Needed only for global
  applyClassName?: (className: string) => unknown
}

declare const Ya: any
declare const ga: any

class Boundary extends React.Component<BoundaryProps> {
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
      this.props.applyClassName?.('p-0')
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

    // TODO: check if this needs to be authorized
    this.props
      .execute(
        GeneralApi.log({
          type: 'page',
          gaId,
          ymId,
          name: e.name,
          message: e.message,
          stack: `${e.stack}\nComponents stack: ${info.componentStack}`,
        }),
      )
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
export default withApiClient<BoundaryProps>(Boundary)
