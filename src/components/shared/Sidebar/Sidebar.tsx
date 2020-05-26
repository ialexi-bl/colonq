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
        <Link to={index()} className={cn(styles.Button, styles.ButtonLogo)}>
          <InteractiveLogo className={styles.Logo} />
        </Link>
        <CleanButton
          className={cn(styles.Button, styles.ButtonNav)}
          onClick={() => dispatch(toggleNav(!open))}
        >
          <Hamburger className={styles.Icon} />
        </CleanButton>
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

      <Nav open={open} />
    </div>
  )
}
