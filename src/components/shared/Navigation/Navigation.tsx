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

export function useIsNavigationRendered() {
  const status = useSelector((state: AppState) => state.user.status)
  const loadedOnce = useWasTrue(status !== 'loading')

  return status === 'authenticated' || (status === 'loading' && loadedOnce)
}
export function useIsNavigationVisible() {
  const visible = useSelector((state: AppState) => state.view.navigationVisible)
  return useIsNavigationRendered() && visible
}

export default function Navigation() {
  const location = useLocation()
  const visible = useSelector((state: AppState) => state.view.navigationVisible)

  if (!useIsNavigationRendered()) return null
  return (
    <nav
      className={cn(
        'flex justify-center items-center bg-navigation fixed inset-x-0 bottom-0 h-12 px-2',
        'z-navigation transition-transform duration-300 transform',
        'sm:top-0 sm:bottom-auto sm:h-16',
        !visible && 'translate-y-full sm:-translate-y-full',
      )}
    >
      <NavLink visible={visible} location={location} to={appsList()}>
        <List className={'w-8 h-8'} />
        <p className={'hidden md:block ml-4 uppercase'}>Приложения</p>
      </NavLink>
      <NavLink visible={visible} location={location} to={profile()}>
        <User className={'w-8 h-8'} />
        <p className={'hidden md:block ml-4 uppercase'}>Профиль</p>
      </NavLink>
    </nav>
  )
}

const NavLink = ({
  to,
  visible,
  location,
  children,
}: {
  to: string
  visible: boolean
  location: Location
  children: ReactNode
}) => {
  const isCurrentLocation = location.pathname === to

  if (isCurrentLocation) {
    return (
      <button
        tabIndex={visible ? 0 : -1}
        className={linkClassnames(isCurrentLocation)}
      >
        {children}
      </button>
    )
  }
  return (
    <Link
      to={to}
      tabIndex={visible ? 0 : -1}
      className={linkClassnames(isCurrentLocation)}
    >
      {children}
    </Link>
  )
}

const linkClassnames = (isCurrentLocation?: boolean) => {
  return cn(
    'flex-1 flex items-center justify-center duration-100',
    'outline-none focus:text-gray-500',
    isCurrentLocation ? 'text-light' : 'text-gray-400',
  )
}
