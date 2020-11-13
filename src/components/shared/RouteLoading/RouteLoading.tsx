import { AppState } from 'store/types'
import { CSSTransition } from 'react-transition-group'
import { useSelector } from 'react-redux'
import Loading from '../Loading'
import React from 'react'
import cn from 'clsx'
import styles from './RouteLoading.module.scss'

const TIMEOUT = parseInt(styles.transitionDuration)
const CLASS_NAME = styles.transitionClassName

/**
 * Loading, used by the entire application. Envoked with redux actions.
 * Keeps track of the IDs of components that initiated loading
 * and hides only when all of them finished loading
 */
export default function RouteLoading() {
  const visible = useSelector(
    (state: AppState) => state.view.loading.length > 0,
  )

  return (
    <CSSTransition timeout={TIMEOUT} classNames={CLASS_NAME} in={visible}>
      <div
        className={cn(
          'absolute inset-0 bg-secondary-1000 z-loading',
          styles.RouteLoading,
        )}
      >
        <Loading />
      </div>
    </CSSTransition>
  )
}
