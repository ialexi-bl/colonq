import { appsList } from 'config/routes'
import { push } from 'connected-react-router'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import Exit from 'components/icons/Exit'
import Help from 'components/icons/Help'
import Hide from 'components/icons/Hide'
import cn from 'clsx'
import useOnWindowKeyPress from 'hooks/use-on-window-key-press'

export default function SessionControls({ className, children }: BasicProps) {
  return <div className={cn(className, 'flex px-2 pb-4')}>{children}</div>
}

export function SessionExit() {
  const dispatch = useDispatch()
  return (
    <button
      title={'Остановить занятие и выйти'}
      className={classNames}
      onClick={() => dispatch(push(appsList()))}
    >
      <Exit />
    </button>
  )
}

export function SessionHide({ hide }: { hide: () => unknown }) {
  useOnWindowKeyPress({ shift: true, code: 'KeyW' }, hide)

  return (
    <button
      className={classNames}
      onClick={hide}
      title={
        'Больше не показывать это задание (можно снова включить в настройках) — Shift+W'
      }
    >
      <Hide />
    </button>
  )
}

export function SessionHelp({
  className,
  ...props
}: Childfree<HTMLProps.button>) {
  return (
    <button className={cn(className, classNames)} title={'Помощь'} {...props}>
      <Help />
    </button>
  )
}

const classNames =
  'w-12 h-12 mr-4 duration-100 text-gray-500 focus:text-gray-600'
