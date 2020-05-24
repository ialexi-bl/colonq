import { AppState } from 'store/types'
import { CSSTransition } from 'react-transition-group'
import { CleanButton } from 'components/shared/Button'
import { Hamburger } from 'components/icons/Hamburger'
import { InteractiveLogo } from 'components/shared/InteractiveLogo'
import { Link, useLocation } from 'react-router-dom'
import { Nav, TIMEOUT } from 'components/shared/Nav'
import { Signin } from 'components/icons/Signin'
import { User } from 'components/icons/User'
import { index, profile, signin } from 'config/routes'
import { toggleNav } from 'store/view'
import { useDispatch, useSelector } from 'react-redux'
import React, { useCallback, useEffect, useRef } from 'react'
import cn from 'clsx'
import styles from './Sidebar.module.scss'

/**
 * Main sidebar, provides access to navigation menu,
 * manages browser location when switching navigation
 */
export default () => {
  const dispatch = useDispatch()
  const location = useLocation()
  const [open, { authenticated, loading }] = useSelector((state: AppState) => [
    state.view.navOpen,
    state.auth,
  ])

  const toggle = useCallback(
    (state?: boolean) => {
      const newState = typeof state === 'boolean' ? state : false
      dispatch(toggleNav(newState))
    },
    [dispatch],
  )
  const backdropClick = useCallback(
    (e) => e.target === e.currentTarget && toggle(false),
    [toggle],
  )
  const toggleSidebar = useCallback(() => toggle(!open), [open, toggle])

  // Close sidebar on pressing 'back' on phone devices
  // useEffect(() => {
  //   if (!IS_TOUCH_DEVICE) return
  //   const nav = isNav(location.search)

  //   if (!nav && open) toggle(true)
  //   else if (nav && !open) toggle(false)
  // }, [location.search, open, toggle])

  const prevPath = useRef(location.pathname)
  useEffect(() => {
    if (prevPath.current !== location.pathname) toggle(false)
    prevPath.current = location.pathname
  }, [location.pathname, toggle])

  return (
    <div>
      <aside className={styles.Sidebar}>
        <CleanButton
          className={cn(styles.Button, styles.ButtonNav)}
          onClick={toggleSidebar}
        >
          <Hamburger className={styles.Icon} />
        </CleanButton>
        <Link to={index()} className={cn(styles.Button, styles.ButtonLogo)}>
          <InteractiveLogo className={styles.Logo} />
        </Link>
        <Link
          to={authenticated ? profile() : signin()}
          className={cn(styles.Button, styles.ButtonUser, {
            [styles.Active]: !loading,
          })}
        >
          {authenticated ? (
            <User className={styles.Icon} />
          ) : (
            <Signin className={styles.Icon} />
          )}
        </Link>
      </aside>

      <CSSTransition timeout={TIMEOUT} classNames={'backdrop'} in={open}>
        <div className={styles.Backdrop} onClick={backdropClick} />
      </CSSTransition>

      <Nav close={toggle} open={open} />
    </div>
  )
}
