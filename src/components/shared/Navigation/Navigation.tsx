import { AppState } from 'store/types'
import { Link, useLocation } from 'react-router-dom'
import { Location } from 'history'
import { appsList, profile } from 'config/routes'
import { useSelector } from 'react-redux'
import List from 'components/icons/List'
import User from 'components/icons/User'
import cn from 'clsx'

export default function Navigation() {
  const location = useLocation()
  const visible = useSelector((state: AppState) => state.view.navigationVisible)
  const status = useSelector((state: AppState) => state.user.status)

  if (status === 'unauthenticated') return null

  return (
    <header
      className={cn(
        'flex items-center bg-navigation fixed inset-x-0 bottom-0 h-12 px-2',
        'z-navigation transition-transform duration-300 transform',
        'sm:top-0 sm:bottom-auto sm:h-16',
        !visible && 'translate-y-full',
      )}
    >
      <Link to={appsList()} className={linkClasses(location, appsList())}>
        <List className={'w-8 h-8'} />
      </Link>
      <Link to={profile()} className={linkClasses(location, profile())}>
        <User className={'w-8 h-8'} />
      </Link>
      {/*  <Link className={'w-10'} to={index()}>
        <InteractiveLogo />
      </Link>
      <h1 className={'ml-4 text-2xl'}>
        <Link to={index()}>ColonQ</Link>
      </h1>
      <Link to={appsList()} className={cn(linkClasses, 'ml-auto mr-4')}>
        Приложения
      </Link>
      <Link to={profile()} className={'mx-4 hidden sm:block'}>
        Профиль
      </Link>
       */}
    </header>
  )
}

const linkClasses = (location: Location, path: string) =>
  cn(
    'flex-1 flex items-center justify-center duration-100',
    location.pathname.startsWith(path) ? 'text-light' : 'text-disabled-100',
  )
