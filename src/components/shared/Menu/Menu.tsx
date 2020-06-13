import { AppState } from 'store/types'
import { CSSTransition } from 'react-transition-group'
import { LogoLink, NavButton, ProfileButton } from './buttons'
import { Nav, TIMEOUT } from 'components/shared/Nav'
import { toggleNav } from 'store/view'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router'
import React, { useCallback, useEffect, useRef } from 'react'
import styles from './Menu.module.scss'

/**
 * Main sidebar, provides access to navigation menu,
 * manages browser location when switching navigation
 */
export function Menu() {
  const dispatch = useDispatch()
  const location = useLocation()
  const [open, { authenticated, loading }] = useSelector((state: AppState) => [
    state.view.navOpen,
    state.auth,
  ])

  const backdropClick = useCallback(
    (e) => {
      if (e.target === e.currentTarget) {
        dispatch(toggleNav(false))
      }
    },
    [dispatch],
  )

  const prevPath = useRef(location.pathname)
  useEffect(() => {
    if (prevPath.current !== location.pathname) {
      dispatch(toggleNav(false))
    }
    prevPath.current = location.pathname
  }, [dispatch, location.pathname])

  return (
    <div>
      <aside className={styles.Sidebar}>
        <LogoLink />
        <NavButton onClick={() => dispatch(toggleNav(!open))} />
        <ProfileButton authenticated={authenticated} loading={loading} />
      </aside>

      <CSSTransition timeout={TIMEOUT} classNames={'backdrop'} in={open}>
        <div className={styles.Backdrop} onClick={backdropClick} />
      </CSSTransition>

      <Nav open={open} />
    </div>
  )
}
