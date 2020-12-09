import { CUTE_FACE } from 'config/view'
import Config from 'config'
import GeneralApi from 'services/api/general'
import Page from 'components/shared/Page'
import React, { ErrorInfo, ReactNode } from 'react'
import TitleLine from 'components/shared/TitleLine'
import styles from './Boundary.module.scss'

export type BoundaryProps = {
  children?: ReactNode
  global?: boolean
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
    if (Config.IS_DEV) {
      console.error(e)
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
    GeneralApi.log({
      type: 'page',
      gaId,
      ymId,
      name: e.name,
      message: e.message,
      stack: `${e.stack}\nComponents stack: ${info.componentStack}`,
    }).catch(() => {})
  }

  render() {
    if (!Config.IS_PROD || !this.state.hasError) {
      return this.props.children
    }

    return (
      <Page className={styles.Boundary}>
        <TitleLine>
          ERROR
          <p className={styles.Subtitle}>
            Что-то сломалось {CUTE_FACE}. Попробуй обновить страницу, если не
            получится - вернись позже. Всё обязательно заработает
          </p>
        </TitleLine>
      </Page>
    )
  }
}
export default Boundary
