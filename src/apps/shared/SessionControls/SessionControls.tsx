import { appsList } from 'config/routes'
import { push } from 'connected-react-router'
import { useDispatch } from 'react-redux'
import Exit from 'components/icons/Exit'
import Hide from 'components/icons/Hide'
import cn from 'clsx'

export default function SessionControls({ className, children }: BasicProps) {
  return <div className={cn(className, 'flex px-2 pb-4')}>{children}</div>
}

export function SessionExit() {
  const dispatch = useDispatch()
  return (
    <button className={classNames} onClick={() => dispatch(push(appsList()))}>
      <Exit />
    </button>
  )
}

export function SessionHide({ hide }: { hide: () => unknown }) {
  return <Hide className={classNames} onClick={hide} />
}

const classNames =
  'w-12 h-12 mr-4 duration-100 text-gray-500 focus:text-gray-600'
