import { AppState } from 'store/types'
import { Link, useLocation } from 'react-router-dom'
import { Location } from 'history'
import { ReactNode } from 'react'
import { appsList, profile } from 'config/routes'
import { useSelector } from 'react-redux'
import List from 'components/icons/List'
import User from 'components/icons/User'
import cn from 'clsx'
import useWasTrue from 'hooks/use-was-true'

export function useIsNavigationVisible() {
  const status = useSelector((state: AppState) => state.user.status)
  const visible = useSelector((state: AppState) => state.view.navigationVisible)
  const loadedOnce = useWasTrue(status !== 'loading')

  return (
    visible &&
    (status === 'authenticated' || (status === 'loading' && loadedOnce))
  )
}

export default function Navigation() {
  const location = useLocation()
  const visible = useSelector((state: AppState) => state.view.navigationVisible)

  if (!useIsNavigationVisible()) return null
  return (
    <nav
      className={cn(
        'flex items-center bg-navigation fixed inset-x-0 bottom-0 h-12 px-2',
        'z-navigation transition-transform duration-300 transform',
        'sm:top-0 sm:bottom-auto sm:h-16',
        !visible && 'translate-y-full',
      )}
    >
      <NavLink location={location} to={appsList()}>
        <List className={'w-8 h-8'} />
      </NavLink>
      <NavLink location={location} to={profile()}>
        <User className={'w-8 h-8'} />
      </NavLink>
    </nav>
  )
}

const NavLink = ({
  to,
  location,
  children,
}: {
  to: string
  location: Location
  children: ReactNode
}) => {
  const isCurrentLocation = location.pathname === to

  if (isCurrentLocation) {
    return (
      <button className={linkClassnames(isCurrentLocation)}>{children}</button>
    )
  }
  return (
    <Link to={to} className={linkClassnames(isCurrentLocation)}>
      {children}
    </Link>
  )
}

const linkClassnames = (isCurrentLocation?: boolean) => {
  return cn(
    'flex-1 flex items-center justify-center duration-100',
    'outline-none focus:text-disabled-700',
    isCurrentLocation ? 'text-light' : 'text-disabled-100',
  )
}
