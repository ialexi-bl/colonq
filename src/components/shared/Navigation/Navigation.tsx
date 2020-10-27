import { AppState } from 'store/types'
import { Link } from 'react-router-dom'
import { index } from 'config/routes'
import { useSelector } from 'react-redux'
import InteractiveLogo from '../InteractiveLogo'
import React from 'react'
import cn from 'clsx'

export default function Navigation() {
  const visible = useSelector((state: AppState) => state.view.navigationVisible)

  return (
    <div
      className={cn(
        'flex items-center bg-navigation fixed inset-x-0 bottom-0 h-12 px-2',
        'z-50 transition-transform duration-300 transform',
        !visible && 'translate-y-full',
      )}
    >
      <Link className={'w-10'} to={index()}>
        <InteractiveLogo />
      </Link>
      <h1 className={'ml-4 text-2xl'}>ColonQ</h1>
    </div>
  )
}
